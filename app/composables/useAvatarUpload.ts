import { ref } from 'vue'
import { validateImageFile, type ImageFileConfig } from '~/lib/validators'

export const useAvatarUpload = (config?: ImageFileConfig) => {
  const avatarFile = ref<File | null>(null)
  const avatarPreview = ref<string | null>(null)
  const shouldDeleteAvatar = ref(false)

  function handleFileChange(event: Event) {
    const { addToast } = useToast()
    const target = event.target as HTMLInputElement
    const file = target.files?.[0] || null

    if (!file) {
      reset()
      return
    }

    // Validate the file
    const validation = validateImageFile(file, config)
    if (!validation.isValid) {
      addToast(validation.errors[0] || 'Invalid file', 'error')
      reset()
      // Reset the input
      target.value = ''
      return
    }

    // Set the file and generate preview
    avatarFile.value = file
    shouldDeleteAvatar.value = false

    // Generate preview using FileReader
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  function markForDeletion() {
    shouldDeleteAvatar.value = true
    avatarFile.value = null
    avatarPreview.value = null
  }

  function getPreviewUrl(existingAvatarUrl?: string | null): string | null {
    if (avatarPreview.value) {
      return avatarPreview.value
    }
    if (shouldDeleteAvatar.value) {
      return null
    }
    return existingAvatarUrl || null
  }

  function appendToFormData(formData: FormData) {
    if (avatarFile.value) {
      formData.append('avatar', avatarFile.value)
    }
    if (shouldDeleteAvatar.value) {
      formData.append('remove_avatar', '1')
    }
  }

  function reset() {
    avatarFile.value = null
    avatarPreview.value = null
    shouldDeleteAvatar.value = false
  }

  return {
    avatarFile,
    avatarPreview,
    shouldDeleteAvatar,
    handleFileChange,
    markForDeletion,
    getPreviewUrl,
    appendToFormData,
    reset,
  }
}
