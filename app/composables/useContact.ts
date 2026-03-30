export const useContact = () => {
    const api = useApi()

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
            const response = await api.post<{ message: string }>('/api/v1/contact', contactForm.value)
            success.value = response.message
            contactForm.value = { name: '', email: '', subject: '', message: '' }
        } catch (err: any) {
            if (err?.errors && typeof err.errors === 'object') {
                const flat: Record<string, string> = {}
                for (const [field, messages] of Object.entries(err.errors)) {
                    flat[field] = Array.isArray(messages) ? (messages[0] as string) : String(messages)
                }
                fieldErrors.value = flat
            } else {
                error.value = err?.message || 'Something went wrong. Please try again.'
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
