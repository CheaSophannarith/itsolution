import { ref, computed } from 'vue'
import {
  validatePassword,
  validatePasswordMatch,
  type PasswordRequirements,
} from '~/lib/validators'

export const usePasswordValidation = (requirements?: PasswordRequirements) => {
  const password = ref('')
  const confirmPassword = ref('')
  const passwordErrors = ref<string[]>([])
  const confirmPasswordErrors = ref<string[]>([])

  const isPasswordValid = computed(() => passwordErrors.value.length === 0 && password.value !== '')
  const isConfirmPasswordValid = computed(
    () => confirmPasswordErrors.value.length === 0 && confirmPassword.value !== ''
  )
  const isValid = computed(() => isPasswordValid.value && isConfirmPasswordValid.value)

  const passwordErrorMessage = computed(() => passwordErrors.value[0] || '')
  const confirmPasswordErrorMessage = computed(() => confirmPasswordErrors.value[0] || '')

  const allErrors = computed(() => [...passwordErrors.value, ...confirmPasswordErrors.value])

  function validatePasswordField(): boolean {
    const result = validatePassword(password.value, requirements)
    passwordErrors.value = result.errors
    return result.isValid
  }

  function validateConfirmPasswordField(): boolean {
    const result = validatePasswordMatch(password.value, confirmPassword.value)
    confirmPasswordErrors.value = result.errors
    return result.isValid
  }

  function validateAll(): boolean {
    const isPasswordValid = validatePasswordField()
    const isConfirmPasswordValid = validateConfirmPasswordField()
    return isPasswordValid && isConfirmPasswordValid
  }

  function reset() {
    password.value = ''
    confirmPassword.value = ''
    passwordErrors.value = []
    confirmPasswordErrors.value = []
  }

  return {
    password,
    confirmPassword,
    passwordErrors,
    confirmPasswordErrors,
    isPasswordValid,
    isConfirmPasswordValid,
    isValid,
    passwordErrorMessage,
    confirmPasswordErrorMessage,
    allErrors,
    validatePasswordField,
    validateConfirmPasswordField,
    validateAll,
    reset,
  }
}
