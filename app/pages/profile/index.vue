<template>
    <div class="min-h-screen bg-gray-50 py-6 sm:py-10">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="flex flex-col md:flex-row md:items-stretch gap-6">

                <!-- Sidebar -->
                <ProfileSidebar v-model="activeTab" />

                <!-- Main Content -->
                <div class="flex-1 min-w-0 md:flex md:flex-col">
                    <ProfileSection v-if="activeTab === 'profile'" />
                    <ChangePasswordSection v-else-if="activeTab === 'password'" />
                    <AddressSection v-else-if="activeTab === 'address'" />
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChangePasswordSection from '~/components/profile/change-password-section.vue'
import AddressSection from '~/components/profile/address-section.vue'

definePageMeta({
    middleware: 'auth'
})

useSeoMeta({ title: 'My Profile', robots: 'noindex, nofollow' })

const activeTab = ref<'profile' | 'password' | 'address'>('profile')
</script>
