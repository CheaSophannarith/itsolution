export const useContact = () => {
    const config = useRuntimeConfig()

    const contactForm = ref({ name: '', email: '', subject: '', message: '' })
    const fieldErrors = ref<Record<string, string>>({})
    const error = ref('')
    const success = ref('')
    const isSubmitting = ref(false)

    async function sendMessage() {
        fieldErrors.value = {}
        error.value = ''
        success.value = ''
        isSubmitting.value = true

        try {
            const response = await $fetch<{ message: string }>('/api/v1/contact', {
                baseURL: config.public.apiBaseUrl,
                method: 'POST',
                body: contactForm.value,
                headers: { Accept: 'application/json' },
            })
            success.value = response.message
            contactForm.value = { name: '', email: '', subject: '', message: '' }
        } catch (err: any) {
            const data = err?.data ?? err
            if (data?.errors && typeof data.errors === 'object') {
                const flat: Record<string, string> = {}
                for (const [field, messages] of Object.entries(data.errors)) {
                    flat[field] = Array.isArray(messages) ? (messages[0] as string) : String(messages)
                }
                fieldErrors.value = flat
            } else if (err instanceof TypeError) {
                error.value = 'Unable to connect to the server. Please check your connection and try again.'
            } else {
                error.value = data?.message || 'Something went wrong. Please try again.'
            }
        } finally {
            isSubmitting.value = false
        }
    }

    return {
        contactForm,
        fieldErrors,
        error,
        success,
        isSubmitting,
        sendMessage,
    }
}
