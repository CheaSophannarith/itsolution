<template>
    <div class="min-h-screen bg-white py-4 sm:py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">

            <!-- Two Column Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <!-- Left Column: Account & Password -->
                <div class="space-y-6">
                    <!-- Account Information Card -->
                    <div class="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div class="px-4 sm:px-6 py-3 sm:py-4  border-b border-brand/20 flex items-center justify-between gap-2">
                            <div class="flex items-center gap-2 sm:gap-3">
                                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                </div>
                                <h2 class="text-base sm:text-lg font-bold text-white tracking-wide">Profile Information</h2>
                            </div>
                            <button v-if="!showProfileForm" @click="startProfileEdit" type="button"
                                class="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-brand rounded-lg hover:bg-gray-50 hover:shadow-md transition-all text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                                Edit
                            </button>
                        </div>
                        <div class="p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50/30">
                    <div class="flex items-center gap-4 sm:gap-5 mb-6">
                        <div class="relative group">
                            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-brand to-brand/80 flex items-center justify-center ring-4 ring-brand/10 shadow-lg group-hover:ring-brand/20 transition-all">
                                <img v-if="avatarUrl"
                                    :src="avatarUrl"
                                    alt="Profile avatar"
                                    class="w-full h-full object-cover">
                                <User v-else class="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                            </div>
                            <div v-if="showProfileForm" class="absolute -bottom-1 -right-1 flex gap-1.5">
                                <label class="cursor-pointer bg-brand hover:bg-brand/90 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 ring-2 ring-white">
                                    <Upload class="w-4 h-4" />
                                    <input type="file" accept="image/*" @change="handleAvatarChange" class="hidden">
                                </label>
                                <button v-if="avatarUrl"
                                    @click="deleteAvatar"
                                    type="button"
                                    class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 ring-2 ring-white">
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{{ authStore.user?.name }}</h3>
                            <p class="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                {{ authStore.user?.email }}
                            </p>
                        </div>
                    </div>

                    <form v-if="showProfileForm" @submit.prevent="updateProfile" class="space-y-5 bg-white rounded-xl">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="group">
                                <label for="name" class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                                    <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    Full Name
                                </label>
                                <input v-model="profileForm.name" type="text" id="name"
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all bg-white hover:border-gray-400 text-gray-900 placeholder-gray-400"
                                    placeholder="Enter your full name">
                            </div>
                            <div class="group">
                                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                                    <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                    Email Address
                                </label>
                                <input v-model="profileForm.email" type="email" id="email"
                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all bg-white hover:border-gray-400 text-gray-900 placeholder-gray-400"
                                    placeholder="Enter your email address">
                            </div>
                        </div>

                        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button type="button" @click="handleCancelProfileEdit"
                                class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                Cancel
                            </button>
                            <button type="submit" :disabled="isUpdating"
                                class="px-6 py-2.5 bg-brand text-white rounded-lg hover:bg-brand/90 transition-all disabled:opacity-50 font-semibold shadow-md hover:shadow-lg flex items-center gap-2">
                                <Loader2 v-if="isUpdating" class="w-4 h-4 animate-spin" />
                                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Save</span>
                            </button>
                        </div>
                    </form>
                        </div>
                    </div>

                    <!-- Change Password Card -->
                    <div class="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
                        <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between gap-2">
                            <div class="flex items-center gap-2 sm:gap-3">
                                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                </div>
                                <h2 class="text-base sm:text-lg font-semibold text-gray-900">Password</h2>
                            </div>
                            <button v-if="!showPasswordForm" @click="startPasswordEdit" type="button"
                                class="px-3 sm:px-4 py-1.5 sm:py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-xs sm:text-sm font-medium">
                                Change
                            </button>
                        </div>
                        <div v-if="showPasswordForm" class="p-4 sm:p-6">
                    <form @submit.prevent="updatePassword" class="space-y-4">
                        <div>
                            <label for="current_password" class="block text-sm font-medium text-gray-700 mb-1">Current
                                Password</label>
                            <div class="relative">
                                <input v-model="currentPassword"
                                    :type="showCurrentPassword ? 'text' : 'password'" id="current_password"
                                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                                <button type="button" @click="toggleCurrentPasswordVisibility"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <Eye v-if="showCurrentPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label for="new_password" class="block text-sm font-medium text-gray-700 mb-1">New
                                Password</label>
                            <div class="relative">
                                <input v-model="newPassword" :type="showNewPassword ? 'text' : 'password'"
                                    id="new_password"
                                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                                <button type="button" @click="toggleNewPasswordVisibility"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <Eye v-if="showNewPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
                            <!-- Password Requirements -->
                            <div v-if="newPassword" class="mt-2 space-y-1 text-xs">
                                <p :class="passwordRequirements.minLength ? 'text-green-600' : 'text-gray-500'">
                                    {{ passwordRequirements.minLength ? '✓' : '○' }} At least 8 characters
                                </p>
                                <p :class="passwordRequirements.hasUppercase ? 'text-green-600' : 'text-gray-500'">
                                    {{ passwordRequirements.hasUppercase ? '✓' : '○' }} One uppercase letter
                                </p>
                                <p :class="passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-500'">
                                    {{ passwordRequirements.hasNumber ? '✓' : '○' }} One number
                                </p>
                            </div>
                        </div>
                        <div>
                            <label for="confirm_password" class="block text-sm font-medium text-gray-700 mb-1">Confirm
                                New Password</label>
                            <div class="relative">
                                <input v-model="confirmPassword"
                                    :type="showConfirmPassword ? 'text' : 'password'" id="confirm_password"
                                    :class="confirmPassword && newPassword !== confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brand focus:border-brand'"
                                    class="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 transition-colors">
                                <button type="button" @click="toggleConfirmPasswordVisibility"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <Eye v-if="showConfirmPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
                            <!-- Password Match Indicator -->
                            <p v-if="confirmPassword && newPassword !== confirmPassword"
                                class="flex items-center gap-1.5 mt-2 text-sm text-red-500 font-medium">
                                <CheckCircle class="w-4 h-4" />
                                Passwords do not match
                            </p>
                        </div>

                        <div class="flex justify-end gap-3 pt-4">
                            <button type="button" @click="cancelPasswordEdit"
                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isUpdatingPassword"
                                class="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50 flex items-center gap-2">
                                <Loader2 v-if="isUpdatingPassword" class="w-4 h-4 animate-spin" />
                                <span>Save</span>
                            </button>
                        </div>
                    </form>
                        </div>
                    </div>
                </div>
                <!-- End Left Column -->

                <!-- Right Column: Addresses -->
                <div class="space-y-6">
                    <!-- Address Management Card -->
                    <div class="bg-white rounded-lg sm:rounded-xl overflow-hidden">
                <div class=" py-3 sm:py-4 flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                        </div>
                        <h2 class="text-base sm:text-lg font-semibold text-gray-900">Addresses</h2>
                    </div>
                    <button v-if="!showAddressForm && addresses.length > 0" @click="startAddingAddress" type="button"
                        class="px-3 sm:px-4 py-1.5 sm:py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-all text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2">
                        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        <span class="hidden xs:inline">Add New</span>
                        <span class="xs:hidden">Add</span>
                    </button>
                </div>

                <div class="">
                    <!-- Loading State -->
                    <div v-if="isLoadingAddresses" class="flex items-center justify-center py-8">
                        <Loader2 class="w-6 h-6 animate-spin text-brand" />
                    </div>

                    <!-- Address List -->
                    <div v-else-if="!showAddressForm && addresses.length > 0" class="space-y-3 sm:space-y-4">
                        <div v-for="address in addresses" :key="address.uuid"
                            class="address-card border border-gray-200 rounded-lg p-3 sm:p-4 relative bg-white hover:border-gray-300 transition-all">
                            <!-- Default Badge -->
                            <div v-if="address.is_default"
                                class="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-brand to-brand/90 text-white text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                                <span class="hidden xs:inline">Default</span>
                            </div>

                            <div class="pr-16 sm:pr-20">
                                <!-- Address Type & Label -->
                                <div class="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                                    <span class="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 text-xs font-medium rounded-md"
                                        :class="address.type === 'shipping' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'">
                                        <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path v-if="address.type === 'shipping'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                                        </svg>
                                        {{ address.type }}
                                    </span>
                                    <span v-if="address.label" class="text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 px-2 sm:px-2.5 py-1 rounded-md">
                                        {{ address.label }}
                                    </span>
                                </div>

                                <!-- Full Name -->
                                <p class="font-semibold text-gray-900 mb-1.5 sm:mb-2 text-base sm:text-lg">{{ address.full_name }}</p>

                                <!-- Company -->
                                <p v-if="address.company" class="text-xs sm:text-sm text-gray-700 mb-1.5 sm:mb-2 font-medium flex items-center gap-1.5">
                                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                    </svg>
                                    {{ address.company }}
                                </p>

                                <!-- Formatted Address -->
                                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2 sm:mb-3 flex items-start gap-1.5">
                                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <span>{{ address.formatted_address }}</span>
                                </p>

                                <!-- Contact Info -->
                                <div class="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                                    <span v-if="address.phone" class="flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                        {{ address.phone }}
                                    </span>
                                    <span v-if="address.email" class="flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                        {{ address.email }}
                                    </span>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="grid grid-cols-3 gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                                <button @click="startEditingAddress(address)" type="button"
                                    class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5">
                                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                    Edit
                                </button>
                                <button v-if="!address.is_default" @click="handleSetDefault(address.uuid)" type="button"
                                    :disabled="isSubmittingAddress"
                                    class="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-brand text-white rounded-lg hover:bg-brand/90 transition-all text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5">
                                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span class="hidden xs:inline">Set Default</span>
                                    <span class="xs:hidden">Default</span>
                                </button>
                                <button @click="startDeletingAddress(address)" type="button"
                                    class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5"
                                    :class="address.is_default ? 'col-span-2 sm:col-span-1' : ''">
                                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Address Form -->
                    <form v-else @submit.prevent="handleAddressSubmit" class="space-y-4 sm:space-y-5 form-section">
                        <!-- Form Header -->
                        <div class="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-200">
                            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path v-if="currentAddress" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-base sm:text-lg font-semibold text-gray-900">
                                    {{ currentAddress ? 'Edit Address' : 'Add New Address' }}
                                </h3>
                                <p class="text-xs sm:text-sm text-gray-500">
                                    {{ currentAddress ? 'Update your address information' : 'Fill in the details below' }}
                                </p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label for="address_type" class="block text-sm font-medium text-gray-700 mb-1">Type
                                    <span class="text-red-500">*</span></label>
                                <select v-model="addressForm.type" id="address_type" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                                    <option value="shipping">Shipping</option>
                                    <option value="billing">Billing</option>
                                </select>
                            </div>
                            <div>
                                <label for="address_label" class="block text-sm font-medium text-gray-700 mb-1">Label</label>
                                <input v-model="addressForm.label" type="text" id="address_label" maxlength="50"
                                    placeholder="e.g., Home, Office"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label for="first_name" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">First Name
                                    <span class="text-red-500">*</span></label>
                                <input v-model="addressForm.first_name" type="text" id="first_name" required
                                    maxlength="100"
                                    class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                            </div>
                            <div>
                                <label for="last_name" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Last Name
                                    <span class="text-red-500">*</span></label>
                                <input v-model="addressForm.last_name" type="text" id="last_name" required
                                    maxlength="100"
                                    class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                            </div>
                        </div>

                        <div>
                            <label for="company" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input v-model="addressForm.company" type="text" id="company" maxlength="200"
                                class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                        </div>

                        <div>
                            <label for="address_line_1" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Address Line 1 <span class="text-red-500">*</span></label>
                            <input v-model="addressForm.address_line_1" type="text" id="address_line_1" required
                                maxlength="255"
                                class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                        </div>

                        <div>
                            <label for="address_line_2" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                            <input v-model="addressForm.address_line_2" type="text" id="address_line_2" maxlength="255"
                                class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div class="col-span-2 sm:col-span-1">
                                <label for="city" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">City <span
                                        class="text-red-500">*</span></label>
                                <input v-model="addressForm.city" type="text" id="city" required maxlength="100"
                                    class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                            </div>
                            <div>
                                <label for="state" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">State</label>
                                <input v-model="addressForm.state" type="text" id="state" maxlength="100"
                                    class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                            </div>
                            <div>
                                <label for="postal_code" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Postal
                                    <span class="text-red-500">*</span></label>
                                <input v-model="addressForm.postal_code" type="text" id="postal_code" required
                                    maxlength="20"
                                    class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                            </div>
                        </div>

                        <div>
                            <label for="country_code" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Country Code (2 letters) <span class="text-red-500">*</span></label>
                            <input v-model="addressForm.country_code" type="text" id="country_code" required minlength="2"
                                maxlength="2" placeholder="e.g., US, GB, CA"
                                class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm uppercase">
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label for="phone" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input v-model="addressForm.phone" type="tel" id="phone" maxlength="20"
                                    class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                            </div>
                            <div>
                                <label for="address_email" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input v-model="addressForm.email" type="email" id="address_email" maxlength="255"
                                    class="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                            </div>
                        </div>

                        <!-- Only show is_default checkbox when creating new address -->
                        <div v-if="!currentAddress" class="flex items-center">
                            <input v-model="addressForm.is_default" type="checkbox" id="is_default"
                                class="w-4 h-4 text-brand border-gray-300 rounded focus:ring-2 focus:ring-brand">
                            <label for="is_default" class="ml-2 text-xs sm:text-sm text-gray-700">Set as default address</label>
                        </div>

                        <div class="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
                            <button v-if="addresses.length > 0" type="button" @click="cancelAddressForm"
                                class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isSubmittingAddress"
                                class="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-brand text-white rounded-lg hover:bg-brand/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium">
                                <Loader2 v-if="isSubmittingAddress" class="w-4 h-4 animate-spin" />
                                <span>{{ currentAddress ? 'Update' : 'Save' }}</span>
                            </button>
                        </div>
                    </form>
                </div>
                    </div>
                </div>
                <!-- End Right Column -->
            </div>
            <!-- End Two Column Layout -->
        </div>

        <!-- Delete Confirmation Modal -->
        <Transition name="modal">
            <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showDeleteModal = false">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-gray-900/70 backdrop-blur-md transition-opacity"></div>

                <!-- Modal Content -->
                <div class="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden" @click.stop>
                    <!-- Header with Icon -->
                    <div class="px-4 sm:px-6 pt-6 pb-4">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-1">Delete Address</h3>
                                <p class="text-xs sm:text-sm text-gray-600">This action cannot be undone</p>
                            </div>
                        </div>
                    </div>

                    <!-- Body -->
                    <div class="px-4 sm:px-6 py-4">
                        <p class="text-gray-700 mb-4">Are you sure you want to permanently delete this address?</p>

                        <div class="bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-xl p-4 space-y-2">
                            <p class="font-semibold text-gray-900 flex items-center gap-2">
                                <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                                </svg>
                                {{ currentAddress?.full_name }}
                            </p>
                            <p class="text-sm text-gray-700 leading-relaxed pl-6">{{ currentAddress?.formatted_address }}</p>
                        </div>

                        <div class="mt-4 flex items-start gap-3 text-sm text-gray-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <svg class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                            <span class="text-amber-900 font-medium">Warning: This action is permanent and cannot be reversed.</span>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-3">
                        <button type="button" @click="showDeleteModal = false"
                            class="w-full sm:w-auto px-6 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all border border-gray-300">
                            Cancel
                        </button>
                        <button type="button" @click="confirmDelete" :disabled="isSubmittingAddress"
                            class="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center">
                            <Loader2 v-if="isSubmittingAddress" class="w-4 h-4 animate-spin" />
                            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            <span>{{ isSubmittingAddress ? 'Deleting...' : 'Delete Address' }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { User, CheckCircle, Eye, EyeOff, Loader2, Upload, Trash2 } from 'lucide-vue-next'
import type { Address, AddressFormData } from '~/types/address'

definePageMeta({
    middleware: 'auth'
})

const authStore = useAuthStore()

// Profile form composable
const {
    formData: profileForm,
    isEditing: showProfileForm,
    isSubmitting: isUpdating,
    startEdit: startProfileEdit,
    cancelEdit: cancelProfileEdit,
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

// Computed property for avatar URL (ensures reactivity)
const avatarUrl = computed(() => getPreviewUrl(authStore.user?.avatar))

// Password form composable
const {
    currentPassword,
    newPassword,
    confirmPassword,
    isEditing: showPasswordForm,
    isSubmitting: isUpdatingPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    startEdit: startPasswordEdit,
    cancelEdit: cancelPasswordEdit,
    submitPasswordChange,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
} = usePasswordForm()

// Password requirements for display
const passwordRequirements = computed(() => ({
    minLength: newPassword.value.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword.value),
    hasNumber: /[0-9]/.test(newPassword.value)
}))

async function updateProfile() {
    try {
        await updateProfileWithFormData(avatarFile.value, shouldDeleteAvatar.value)
        resetAvatar()
    } catch (error) {
        // Error already handled by composable
    }
}

async function updatePassword() {
    await submitPasswordChange()
}

function deleteAvatar() {
    markAvatarForDeletion()
}

function handleCancelProfileEdit() {
    cancelProfileEdit()
    resetAvatar()
}

// Address management
const {
    addresses,
    isLoading: isLoadingAddresses,
    isSubmitting: isSubmittingAddress,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} = useAddresses()

const currentAddress = ref<Address | null>(null)
const showDeleteModal = ref(false)
const showAddressForm = ref(false)
const addressForm = ref<AddressFormData>({
    type: 'shipping',
    first_name: '',
    last_name: '',
    company: null,
    address_line_1: '',
    address_line_2: null,
    city: '',
    state: null,
    postal_code: '',
    country_code: '',
    phone: null,
    email: null,
    label: null,
    is_default: false
})

function startAddingAddress() {
    resetAddressForm()
    showAddressForm.value = true
}

function startEditingAddress(address: Address) {
    currentAddress.value = address
    addressForm.value = {
        type: address.type,
        first_name: address.first_name,
        last_name: address.last_name,
        company: address.company,
        address_line_1: address.address_line_1,
        address_line_2: address.address_line_2,
        city: address.city,
        state: address.state,
        postal_code: address.postal_code,
        country_code: address.country_code,
        phone: address.phone,
        email: address.email,
        label: address.label,
        is_default: address.is_default
    }
    showAddressForm.value = true
}

function startDeletingAddress(address: Address) {
    currentAddress.value = address
    showDeleteModal.value = true
}

function resetAddressForm() {
    currentAddress.value = null
    addressForm.value = {
        type: 'shipping',
        first_name: '',
        last_name: '',
        company: null,
        address_line_1: '',
        address_line_2: null,
        city: '',
        state: null,
        postal_code: '',
        country_code: '',
        phone: null,
        email: null,
        label: null,
        is_default: false
    }
}

function cancelAddressForm() {
    resetAddressForm()
    showAddressForm.value = false
}

async function handleAddressSubmit() {
    try {
        if (currentAddress.value) {
            // Update existing address - exclude is_default field
            const { is_default, ...updateData } = addressForm.value
            await updateAddress(currentAddress.value.uuid, updateData as AddressFormData)
        } else {
            // Create new address
            await createAddress(addressForm.value)
        }
        // Reload addresses and hide form
        await fetchAddresses()
        showAddressForm.value = false
        resetAddressForm()
    } catch (error) {
        // Error already handled by composable
    }
}

async function handleSetDefault(uuid: string) {
    try {
        await setDefaultAddress(uuid)
        await fetchAddresses()
    } catch (error) {
        // Error already handled by composable
    }
}

async function confirmDelete() {
    if (!currentAddress.value) return

    try {
        await deleteAddress(currentAddress.value.uuid)
        showDeleteModal.value = false
        resetAddressForm()
        await fetchAddresses()
    } catch (error) {
        // Error already handled by composable
    }
}

// Fetch addresses on component mount
onMounted(async () => {
    await fetchAddresses()
    // Show form if no addresses exist
    if (addresses.value.length === 0) {
        showAddressForm.value = true
    }
})
</script>

<style scoped>
/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
    transform: scale(0.9) translateY(-20px);
    opacity: 0;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Address Card Hover Effects */
.address-card {
    transition: all 0.2s ease;
}

.address-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Button Animations */
button {
    transition: all 0.2s ease;
}

button:active:not(:disabled) {
    transform: scale(0.98);
}

/* Badge Animations */
.badge-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.8;
    }
}

/* Form Input Focus Effects */
input:focus,
select:focus,
textarea:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}



/* Empty State */
.empty-state {
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Loading Spinner */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Smooth Transitions for Form */
.form-section {
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Two Column Layout */
.space-y-6 > * {
    animation: fadeIn 0.5s ease;
}

/* Sticky behavior for left column on desktop */
@media (min-width: 1024px) {
    .space-y-6:first-child {
        position: sticky;
        top: 2rem;
        align-self: start;
    }
}

/* Responsive Utilities */
@media (max-width: 640px) {
    /* Better touch targets on mobile */
    button {
        min-height: 40px;
    }
}

/* Hide scrollbar on mobile for cleaner look */
@media (max-width: 768px) {
    ::-webkit-scrollbar {
        width: 0px;
    }
}

/* Smooth grid transitions */
@media (min-width: 1024px) {
    .grid {
        gap: 1.5rem;
    }
}

/* Print styles */
@media print {
    .modal-enter-active,
    .modal-leave-active,
    button:not(.print\\:block) {
        display: none;
    }
}
</style>
