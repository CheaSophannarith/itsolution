import { ref, onMounted } from 'vue'

export const useProfileForm = () => {
  const authStore = useAuthStore()

  const formData = ref({ name: '', email: '' })
  const isEditing = ref(false)
  const isSubmitting = ref(false)

  function initializeForm() {
    if (authStore.user) {
      formData.value = {
        name: authStore.user.name || '',
        email: authStore.user.email || '',
      }
    }
  }

  function startEdit() {
    isEditing.value = true
  }

  function cancelEdit() {
    resetForm()
    isEditing.value = false
  }

  function resetForm() {
    initializeForm()
  }

  async function updateProfileWithFormData(avatarFile: File | null, shouldDelete: boolean) {
    const { addToast } = useToast()
    isSubmitting.value = true

    try {
      // Handle avatar update if file provided
      if (avatarFile) {
        await authStore.updateAvatar(avatarFile)
      }

      // Handle avatar deletion
      if (shouldDelete) {
        await authStore.deleteAvatar()
      }

      // TODO: Implement profile update API for name/email
      // For now, just update local state
      if (authStore.user && (formData.value.name !== authStore.user.name || formData.value.email !== authStore.user.email)) {
        // Simulate update delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Update user object (this should trigger reactivity)
        authStore.user = {
          ...authStore.user,
          name: formData.value.name,
          email: formData.value.email,
        }
      }

      addToast('Profile updated successfully!', 'success')

      isEditing.value = false
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to update profile'
      addToast(errorMessage, 'error')
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  onMounted(() => {
    initializeForm()
  })

  return {
    formData,
    isEditing,
    isSubmitting,
    startEdit,
    cancelEdit,
    updateProfileWithFormData,
  }
}
