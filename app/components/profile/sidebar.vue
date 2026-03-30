<template>
        <aside class="w-full md:w-64 shrink-0 md:flex md:flex-col">
                    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden md:flex md:flex-col md:h-full">
                        <!-- User Summary -->
                        <div class="p-5 border-b border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-full overflow-hidden bg-linear-to-br from-brand to-brand/80 flex items-center justify-center ring-2 ring-brand/10 shrink-0">
                                    <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar" class="w-full h-full object-cover">
                                    <User v-else class="w-6 h-6 text-white" />
                                </div>
                                <div class="min-w-0">
                                    <p class="font-semibold text-gray-900 text-sm truncate">{{ authStore.user?.name }}</p>
                                    <p class="text-xs text-gray-500 truncate">{{ authStore.user?.email }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Navigation -->
                        <nav class="p-2">
                            <button
                                v-for="item in navItems"
                                :key="item.key"
                                @click="activeTab = item.key"
                                type="button"
                                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 last:mb-0"
                                :class="activeTab === item.key
                                    ? 'bg-brand text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
                            >
                                <component :is="item.icon" class="w-4 h-4 shrink-0" />
                                {{ item.label }}
                            </button>
                        </nav>
                    </div>
                </aside>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { User, Lock, MapPin  } from 'lucide-vue-next';
const authStore = useAuthStore()

// Avatar upload composable
const { getPreviewUrl } = useAvatarUpload()
const avatarUrl = computed(() => getPreviewUrl(authStore.user?.avatar))

// Sidebar navigation
const activeTab = defineModel<'profile' | 'password' | 'address'>({
    default: 'profile'
})

const navItems = [
    { key: 'profile' as const, label: 'Profile', icon: User },
    { key: 'password' as const, label: 'Change Password', icon: Lock },
    { key: 'address' as const, label: 'Addresses', icon: MapPin },
]</script>