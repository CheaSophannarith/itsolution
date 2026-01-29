import { ref } from 'vue'
import { usePasswordValidation } from './usePasswordValidation'

export const usePasswordForm = () => {
  const authStore = useAuthStore()

  const {
    password: newPassword,
    confirmPassword,
    validateAll,
    reset: resetValidation,
    allErrors,
  } = usePasswordValidation()

  const currentPassword = ref('')
  const isEditing = ref(false)
  const isSubmitting = ref(false)
  const showCurrentPassword = ref(false)
  const showNewPassword = ref(false)
  const showConfirmPassword = ref(false)

  function startEdit() {
    isEditing.value = true
  }

  function cancelEdit() {
    reset()
    isEditing.value = false
  }

  function reset() {
    currentPassword.value = ''
    resetValidation()
    showCurrentPassword.value = false
    showNewPassword.value = false
    showConfirmPassword.value = false
  }

  async function submitPasswordChange() {
    const { addToast } = useToast()

    // Validate passwords
    if (!validateAll()) {
      addToast(allErrors.value[0] || 'Please check your password', 'error')
      return
    }

    if (!currentPassword.value) {
      addToast('Current password is required', 'error')
      return
    }

    isSubmitting.value = true

    try {
      await authStore.changePassword({
        current_password: currentPassword.value,
        password: newPassword.value,
        password_confirmation: confirmPassword.value,
      })

      addToast('Password updated successfully!', 'success')

      reset()
      isEditing.value = false
    } catch (error: any) {
      console.error('Password update failed:', error)

      let errorMessage = 'Failed to update password. Please try again.'

      if (error.errors && typeof error.errors === 'object') {
        const errors = Object.values(error.errors).flat()
        errorMessage = (errors[0] as string) || errorMessage
      } else if (error.message) {
        if (error.message.toLowerCase().includes('current password')) {
          errorMessage = 'The current password is incorrect.'
        } else if (
          error.message.includes('401') ||
          error.message.toLowerCase().includes('unauthorized')
        ) {
          errorMessage = 'The current password is incorrect.'
        } else {
          errorMessage = error.message
        }
      }

      addToast(errorMessage, 'error')
    } finally {
      isSubmitting.value = false
    }
  }

  function toggleCurrentPasswordVisibility() {
    showCurrentPassword.value = !showCurrentPassword.value
  }

  function toggleNewPasswordVisibility() {
    showNewPassword.value = !showNewPassword.value
  }

  function toggleConfirmPasswordVisibility() {
    showConfirmPassword.value = !showConfirmPassword.value
  }

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    isEditing,
    isSubmitting,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    allErrors,
    startEdit,
    cancelEdit,
    submitPasswordChange,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
  }
}
