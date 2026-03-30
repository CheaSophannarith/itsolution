<template>
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden md:flex md:flex-col md:h-full">
                        <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                            <h2 class="text-base font-semibold text-gray-900">Profile Information</h2>
                        </div>

                        <div class="p-6">
                            <!-- Avatar & Name -->
                            <div class="flex items-center gap-5 mb-6">
                                <div class="relative group">
                                    <div class="w-20 h-20 rounded-full overflow-hidden bg-linear-to-br from-brand to-brand/80 flex items-center justify-center ring-4 ring-brand/10 shadow-md">
                                        <img v-if="avatarUrl" :src="avatarUrl" alt="Profile avatar" class="w-full h-full object-cover">
                                        <User v-else class="w-10 h-10 text-white" />
                                    </div>
                                    <div class="absolute -bottom-1 -right-1 flex gap-1.5">
                                        <label class="cursor-pointer bg-brand hover:bg-brand/90 text-white p-2 rounded-full shadow-md transition-all hover:scale-110 ring-2 ring-white">
                                            <Upload class="w-3.5 h-3.5" />
                                            <input type="file" accept="image/*" @change="handleAvatarChange" class="hidden">
                                        </label>
                                        <button v-if="avatarUrl" @click="deleteAvatar" type="button"
                                            class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all hover:scale-110 ring-2 ring-white">
                                            <Trash2 class="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-base font-bold text-gray-900">{{ authStore.user?.name }}</p>
                                    <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
                                </div>
                            </div>

                            <!-- Edit Form -->
                            <form @submit.prevent="updateProfile" class="space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                        <input v-model="profileForm.name" type="text" id="name"
                                            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm"
                                            placeholder="Enter your full name">
                                    </div>
                                </div>
                                <div class="flex justify-end pt-2 border-t border-gray-100">
                                    <button type="submit" :disabled="isUpdating"
                                        class="px-5 py-2.5 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50 text-sm font-semibold flex items-center gap-2">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
</template>

<script setup lang="ts">
import { User, Upload, Trash2, Loader2 } from 'lucide-vue-next';
const authStore = useAuthStore()
// Profile form composable
const {
    formData: profileForm,
    isSubmitting: isUpdating,
    updateProfileWithFormData,
} = useProfileForm()


// Avatar upload composable
const {
    avatarFile,
    shouldDeleteAvatar,
    handleFileChange: handleAvatarChange,
    markForDeletion: markAvatarForDeletion,
    getPreviewUrl,
    reset: resetAvatar,
} = useAvatarUpload()

const avatarUrl = computed(() => getPreviewUrl(authStore.user?.avatar))
function deleteAvatar() {
    markAvatarForDeletion()
}
async function updateProfile() {
    try {
        await updateProfileWithFormData(avatarFile.value, shouldDeleteAvatar.value)
        resetAvatar()
    } catch (error) {
        // Error already handled by composable
    }

}
</script>