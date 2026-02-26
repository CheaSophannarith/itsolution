import { ref } from 'vue'
import type { Address, AddressFormData, AddressResponse, AddressListResponse } from '~/types/address'

export const useAddresses = () => {
    const api = useApi()
    const { addToast } = useToast()

    const addresses = ref<Address[]>([])
    const isLoading = ref(true)
    const isSubmitting = ref(false)

    // Fetch all addresses
    async function fetchAddresses() {
        isLoading.value = true
        try {
            const response = await api.get<AddressListResponse>('/api/v1/addresses')
            addresses.value = response.data
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to fetch addresses'
            addToast(errorMessage, 'error')
            throw error
        } finally {
            isLoading.value = false
        }
    }

    // Create a new address
    async function createAddress(formData: AddressFormData) {
        isSubmitting.value = true
        try {
            const response = await api.post<AddressResponse>('/api/v1/addresses', formData)
            addresses.value.push(response.data)
            addToast(response.message || 'Address created successfully', 'success')
            return response.data
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to create address'
            addToast(errorMessage, 'error')
            throw error
        } finally {
            isSubmitting.value = false
        }
    }

    // Update an existing address
    async function updateAddress(uuid: string, formData: AddressFormData) {
        isSubmitting.value = true
        try {
            const response = await api.put<AddressResponse>(`/api/v1/addresses/${uuid}`, formData)
            const index = addresses.value.findIndex(addr => addr.uuid === uuid)
            if (index !== -1) {
                addresses.value[index] = response.data
            }
            addToast(response.message || 'Address updated successfully', 'success')
            return response.data
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to update address'
            addToast(errorMessage, 'error')
            throw error
        } finally {
            isSubmitting.value = false
        }
    }

    // Delete an address
    async function deleteAddress(uuid: string) {
        try {
            await api.delete(`/api/v1/addresses/${uuid}`)
            addresses.value = addresses.value.filter(addr => addr.uuid !== uuid)
            addToast('Address deleted successfully', 'success')
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to delete address'
            addToast(errorMessage, 'error')
            throw error
        }
    }

    // Set an address as default
    async function setDefaultAddress(uuid: string) {
        isSubmitting.value = true
        try {
            const response = await api.post<AddressResponse>(`/api/v1/addresses/${uuid}/default`)

            // Update local state: unset all defaults first, then set the new one
            addresses.value = addresses.value.map(addr => ({
                ...addr,
                is_default: addr.uuid === uuid
            }))

            addToast(response.message || 'Default address updated successfully', 'success')
            return response.data
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to set default address'
            addToast(errorMessage, 'error')
            throw error
        } finally {
            isSubmitting.value = false
        }
    }

    return {
        addresses,
        isLoading,
        isSubmitting,
        fetchAddresses,
        createAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress
    }
}
