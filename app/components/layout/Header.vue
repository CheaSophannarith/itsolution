<template>
    <header :class="['sticky top-0 z-50 transition-transform duration-300', { '-translate-y-full': hideHeader }]">
        <!-- Top Section - White Background -->
        <div class="bg-white border-b border-gray-200 mx-auto max-w-full">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div class="flex items-center justify-between gap-2 sm:gap-4">
                    <!-- Mobile Menu Button -->
                    <button @click="toggleMobileMenu" class="lg:hidden p-2 text-brand hover:bg-gray-100 rounded-md">
                        <Menu class="w-6 h-6" />
                    </button>

                    <!-- Logo -->
                    <NuxtLink to="/" class="shrink-0">
                        <img src="/logo.png" alt="TanXLM" class="h-8 sm:h-12" />
                    </NuxtLink>

                    <!-- Search Bar - Hidden on mobile, shown on md+ -->
                    <div class="hidden md:flex flex-1 max-w-md mx-4 lg:mx-12">
                        <div class="relative w-full">
                            <Input type="text" placeholder="Search..."
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                <Search class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Right Section -->
                    <div class="flex items-center gap-2 sm:gap-4 text-sm">
                        <!-- Mobile Search Button -->
                        <button @click="toggleMobileSearch"
                            class="md:hidden p-2 text-brand hover:bg-gray-100 rounded-md">
                            <Search class="w-5 h-5" />
                        </button>

                        <!-- Cart Drawer -->
                        <CartDrawer>
                            <template #trigger>
                                <button
                                    class="relative p-2 text-brand hover:text-white hover:bg-brand rounded-md transition-all">
                                    <ShoppingCart class="w-5 h-5" />
                                    <span v-if="cartTotalItems > 0"
                                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{ cartTotalItems }}</span>
                                </button>
                            </template>
                        </CartDrawer>

                        <!-- Contact Us - Hidden on mobile -->
                        <span class="hidden sm:block text-gray-300">|</span>
                        <NuxtLink to="/contact"
                            class="hidden sm:block text-brand hover:text-white hover:bg-brand hover:px-2 hover:py-2 rounded-md transition-all font-bold">
                            Contact Us
                        </NuxtLink>

                        <!-- User Menu or Sign In - Hidden on mobile -->
                        <span class="hidden sm:block text-gray-300">|</span>
                        <div v-if="authStore.isAuthenticated" class="hidden sm:block relative" ref="userMenuRef"
                            @mouseenter="openUserMenu" @mouseleave="closeUserMenuDelayed">
                            <button @click="toggleUserMenu"
                                class="flex items-center gap-2 p-2 text-brand hover:bg-gray-100 rounded-full transition-all">
                                <!-- Profile Image or Initials -->
                                <div v-if="authStore.user?.profile_image" class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-transparent hover:ring-brand transition-all">
                                    <img :src="authStore.user.profile_image" :alt="authStore.user.name" class="w-full h-full object-cover" />
                                </div>
                                <div v-else class="w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ring-2 ring-transparent hover:ring-brand/50 transition-all">
                                    {{ userInitials }}
                                </div>
                            </button>
                            <Transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <div v-if="userMenuOpen"
                                    @mouseenter="keepUserMenuOpen" @mouseleave="closeUserMenuDelayed"
                                    class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                                    <!-- User Info Header -->
                                    <div class="px-4 py-3 border-b border-gray-200">
                                        <div class="flex items-center gap-3">
                                            <!-- Profile Image or Initials -->
                                            <div v-if="authStore.user?.profile_image" class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                                <img :src="authStore.user.profile_image" :alt="authStore.user.name" class="w-full h-full object-cover" />
                                            </div>
                                            <div v-else class="w-12 h-12 bg-brand text-white rounded-full flex items-center justify-center text-base font-bold flex-shrink-0">
                                                {{ userInitials }}
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-semibold text-gray-900 truncate">{{ authStore.user?.name }}</p>
                                                <p class="text-xs text-gray-600 truncate">{{ authStore.user?.email }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Menu Items -->
                                    <div class="py-1">
                                        <NuxtLink to="/profile" @click="closeUserMenu"
                                            class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                            <CircleUser class="w-5 h-5 text-gray-500" />
                                            <span>My Profile</span>
                                        </NuxtLink>
                                        <NuxtLink to="/orders" @click="closeUserMenu"
                                            class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                            <ShoppingCart class="w-5 h-5 text-gray-500" />
                                            <span>My Orders</span>
                                        </NuxtLink>
                                    </div>

                                    <!-- Logout -->
                                    <div class="border-t border-gray-200 py-1">
                                        <button @click="handleLogout"
                                            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                            <LogOut class="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                        <NuxtLink v-else to="/signin"
                            class="hidden sm:flex items-center gap-2 text-brand hover:text-white hover:bg-brand hover:px-2 hover:py-2 rounded-md transition-all font-bold">
                            <CircleUser class="w-5 h-5" />
                            <span class="hidden lg:inline">Sign In</span>
                        </NuxtLink>

                        <!-- Mobile Profile Icon - Always visible -->
                        <div v-if="authStore.isAuthenticated" class="sm:hidden relative" ref="mobileProfileMenuRef">
                            <button @click="toggleProfileMenu" class="p-2 hover:bg-gray-100 rounded-md relative">
                                <!-- Profile Image or Initials -->
                                <div v-if="authStore.user?.profile_image" class="w-8 h-8 rounded-full overflow-hidden">
                                    <img :src="authStore.user.profile_image" :alt="authStore.user.name" class="w-full h-full object-cover" />
                                </div>
                                <div v-else class="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-xs font-semibold">
                                    {{ userInitials }}
                                </div>
                                <!-- Green dot indicator for logged in -->
                                <span class="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                            </button>

                            <!-- Profile Dropdown Menu -->
                            <Transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <div v-if="profileMenuOpen"
                                    class="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                                    <!-- User Info Header -->
                                    <div class="p-4 bg-white border-b border-brand relative">
                                        <button @click="closeProfileMenu"
                                            class="absolute top-2 right-2 p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-md transition-colors">
                                            <X class="w-4 h-4" />
                                        </button>
                                        <div class="flex items-center gap-3 pr-8">
                                            <!-- Profile Image or Initials -->
                                            <div v-if="authStore.user?.profile_image" class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                                <img :src="authStore.user.profile_image" :alt="authStore.user.name" class="w-full h-full object-cover" />
                                            </div>
                                           <div v-else class="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-xs font-semibold">
                                    {{ userInitials }}
                                </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-semibold text-black truncate">{{ authStore.user?.name }}</p>
                                                <p class="text-xs text-black/80 truncate">{{ authStore.user?.email }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Menu Items -->
                                    <div class="py-2">
                                        <NuxtLink to="/profile" @click="closeProfileMenu"
                                            class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                                            <CircleUser class="w-5 h-5 text-brand" />
                                            <div>
                                                <p class="text-sm font-medium">My Profile</p>
                                            </div>
                                        </NuxtLink>

                                        <NuxtLink to="/orders" @click="closeProfileMenu"
                                            class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                                            <ShoppingCart class="w-5 h-5 text-brand" />
                                            <div>
                                                <p class="text-sm font-medium">My Orders</p>
                                            </div>
                                        </NuxtLink>

                                        <hr class="my-2 border-gray-200">

                                        <button @click="handleLogout"
                                            class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors">
                                            <LogOut class="w-5 h-5" />
                                            <span class="text-sm font-medium">Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                        <NuxtLink v-else to="/signin" class="sm:hidden p-2 text-brand hover:bg-gray-100 rounded-md">
                            <CircleUser class="w-5 h-5" />
                        </NuxtLink>
                    </div>
                </div>

                <!-- Mobile Search Bar -->
                <Transition enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-2">
                    <div v-if="mobileSearchOpen" class="md:hidden mt-3">
                        <div class="relative w-full">
                            <Input type="text" placeholder="Search..." autofocus
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                <Search class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>

        <!-- Bottom Section - Brand Background (Desktop Navigation) -->
        <div class="hidden lg:block bg-brand">
            <div class="w-full px-6 mx-auto max-w-7xl">
                <div class="flex items-center justify-between">
                    <!-- Navigation Links -->
                    <nav class="flex items-center">
                        <div v-for="item in navItems" :key="item.name" class="relative"
                            @mouseenter="openDropdown(item.name)" @mouseleave="closeDropdown">
                            <NuxtLink v-if="!item.children" :to="item.href" :class="[
                                'px-4 xl:px-6 py-3 text-brand-foreground font-medium transition-colors flex items-center gap-1 cursor-pointer text-sm xl:text-base',
                                activeDropdown === item.name ? 'bg-white/20' : 'hover:bg-white/10'
                            ]">
                                {{ item.name }}
                            </NuxtLink>
                            <button v-else type="button" :class="[
                                'px-4 xl:px-6 py-3 text-brand-foreground font-medium transition-colors flex items-center gap-1 cursor-pointer text-sm xl:text-base',
                                activeDropdown === item.name ? 'bg-white/20' : 'hover:bg-white/10'
                            ]">
                                {{ item.name }}
                                <ChevronDown class="w-4 h-4" />
                            </button>
                        </div>
                    </nav>

                    <!-- Phone Number -->
                    <a href="tel:+85517868883" class="text-brand-foreground font-semibold py-3 text-sm xl:text-base">
                        +855 17 86 88 83
                    </a>
                </div>
            </div>
        </div>

        <!-- Mobile Menu Overlay -->
        <Transition enter-active-class="transition-opacity ease-linear duration-300" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-300"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="mobileMenuOpen" class="fixed inset-0 bg-black/50 z-40 lg:hidden" @click="closeMobileMenu"></div>
        </Transition>

        <!-- Mobile Menu Drawer -->
        <Transition enter-active-class="transition ease-in-out duration-300 transform"
            enter-from-class="-translate-x-full" enter-to-class="translate-x-0"
            leave-active-class="transition ease-in-out duration-300 transform" leave-from-class="translate-x-0"
            leave-to-class="-translate-x-full">
            <div v-if="mobileMenuOpen"
                class="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden overflow-y-auto">
                <!-- Mobile Menu Header -->
                <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-brand">
                    <NuxtLink to="/" @click="closeMobileMenu">
                        <img src="/logo.png" alt="TanXLM" class="h-8" />
                    </NuxtLink>
                    <button @click="closeMobileMenu" class="p-2 text-white hover:bg-white/10 rounded-md">
                        <X class="w-6 h-6" />
                    </button>
                </div>

                <!-- Mobile Menu Navigation -->
                <nav class="p-4">
                    <div v-for="item in navItems" :key="item.name" class="border-b border-gray-100 last:border-0">
                        <!-- Nav Item with Children -->
                        <div v-if="item.children">
                            <button @click="toggleMobileSubmenu(item.name)"
                                class="flex items-center justify-between w-full py-3 text-brand font-medium">
                                {{ item.name }}
                                <ChevronDown :class="[
                                    'w-5 h-5 transition-transform',
                                    mobileActiveSubmenu === item.name ? 'rotate-180' : ''
                                ]" />
                            </button>
                            <!-- Submenu -->
                            <Transition enter-active-class="transition ease-out duration-200"
                                enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-screen"
                                leave-active-class="transition ease-in duration-150"
                                leave-from-class="opacity-100 max-h-screen" leave-to-class="opacity-0 max-h-0">
                                <div v-if="mobileActiveSubmenu === item.name" class="overflow-hidden">
                                    <div v-for="child in item.children" :key="child.name" class="pl-4">
                                        <!-- Subcategory with nested children -->
                                        <div v-if="child.children">
                                            <button @click="toggleMobileNestedSubmenu(child.name)"
                                                class="flex items-center justify-between w-full py-2 text-gray-700 text-sm">
                                                {{ child.name }}
                                                <ChevronDown :class="[
                                                    'w-4 h-4 transition-transform',
                                                    mobileActiveNestedSubmenu === child.name ? 'rotate-180' : ''
                                                ]" />
                                            </button>
                                            <Transition enter-active-class="transition ease-out duration-150"
                                                enter-from-class="opacity-0" enter-to-class="opacity-100"
                                                leave-active-class="transition ease-in duration-100"
                                                leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                <div v-if="mobileActiveNestedSubmenu === child.name" class="pl-4 pb-2">
                                                    <NuxtLink v-for="nested in child.children" :key="nested.name"
                                                        :to="nested.href" @click="closeMobileMenu"
                                                        class="block py-1.5 text-gray-600 text-sm hover:text-brand">
                                                        {{ nested.name }}
                                                    </NuxtLink>
                                                </div>
                                            </Transition>
                                        </div>
                                        <!-- Subcategory without children -->
                                        <NuxtLink v-else :to="child.href" @click="closeMobileMenu"
                                            class="block py-2 text-gray-700 text-sm hover:text-brand">
                                            {{ child.name }}
                                        </NuxtLink>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                        <!-- Nav Item without Children -->
                        <NuxtLink v-else :to="item.href" @click="closeMobileMenu"
                            class="block py-3 text-brand font-medium">
                            {{ item.name }}
                        </NuxtLink>
                    </div>
                </nav>

                <!-- Mobile Menu Footer - Contact Info -->
                <div class="border-t border-gray-200 bg-gray-50 p-4">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Need Help?</p>
                    <NuxtLink to="/contact" @click="closeMobileMenu"
                        class="flex items-center gap-3 py-2 text-brand font-medium hover:text-brand/80 transition-colors">
                        <Phone class="w-5 h-5" />
                        Contact Us
                    </NuxtLink>
                    <a href="tel:+85517868883" class="flex items-center gap-3 py-2 text-gray-700 hover:text-brand transition-colors">
                        <Phone class="w-5 h-5" />
                        +855 17 86 88 83
                    </a>
                </div>
            </div>
        </Transition>

        <!-- Mega Menu Dropdown (Desktop) -->
        <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
            <div v-if="activeDropdown && activeNavItem?.children"
                class="absolute left-0 right-0 bg-gray-200 border-b border-gray-200 shadow-lg z-50 hidden lg:block"
                @mouseenter="keepDropdownOpen" @mouseleave="closeDropdown">
                <div class="mx-auto max-w-7xl px-6 py-0">
                    <div class="flex">
                        <!-- Left Column - Categories -->
                        <div class="w-72 border-r border-gray-200 py-4">
                            <!-- Subcategories -->
                            <div v-for="subcat in activeNavItem.children" :key="subcat.name" class="relative"
                                @mouseenter="setActiveSubcategory(subcat)" @mouseleave="clearActiveSubcategory">
                                <NuxtLink :to="subcat.href" :class="[
                                    'flex items-center justify-between px-4 py-1 text-brand hover:bg-brand hover:text-white transition-colors',
                                    activeSubcategory?.name === subcat.name ? 'bg-brand text-white' : ''
                                ]">
                                    {{ subcat.name }}
                                    <ChevronRight v-if="subcat.children" class="w-4 h-4 text-gray-400" />
                                </NuxtLink>
                            </div>
                        </div>

                        <!-- Right Column - Subcategory Children -->
                        <div v-if="activeSubcategory?.children" class="flex-1 py-3 pl-6">
                            <div class="grid grid-cols-2 xl:grid-cols-3 gap-2">
                                <NuxtLink v-for="child in activeSubcategory.children" :key="child.name" :to="child.href"
                                    class="px-3 py-1 text-brand hover:text-white hover:bg-brand rounded transition-colors">
                                    {{ child.name }}
                                </NuxtLink>
                            </div>
                        </div>

                        <!-- Placeholder when no subcategory is hovered -->
                        <div v-else class="flex-1 py-4 pl-6 flex items-center justify-center">
                            <p class="text-gray-500 text-base font-medium">Hover over a category to see more options</p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </header>
</template>

<script setup lang="ts">
    import { ChevronDown, ChevronRight, CircleUser, LogOut, Menu, Phone, Search, ShoppingCart, X } from 'lucide-vue-next'
    import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
    import { useRoute } from 'vue-router'
    import CartDrawer from '~/components/custom/CartDrawer.vue'

    const { totalItems: cartTotalItems } = useCart()
    const authStore = useAuthStore()
    const { addToast } = useToast()

    // Get user initials (first 1-2 characters)
    const userInitials = computed(() => {
        const name = authStore.user?.name || ''
        const words = name.trim().split(' ').filter(word => word.length > 0)
        if (words.length >= 2 && words[0] && words[words.length - 1]) {
            // Get first letter of first and last name
            return (words[0][0] + words[words.length - 1][0]).toUpperCase()
        }
        // Get first 2 letters of single name
        return name.trim().substring(0, 2).toUpperCase() || 'U'
    })

    // User menu state (desktop)
    const userMenuOpen = ref(false)
    const userMenuRef = ref<HTMLElement | null>(null)
    let userMenuTimeout: ReturnType<typeof setTimeout> | null = null

    // Mobile profile menu ref
    const mobileProfileMenuRef = ref<HTMLElement | null>(null)

    function toggleUserMenu() {
        userMenuOpen.value = !userMenuOpen.value
    }

    function openUserMenu() {
        if (userMenuTimeout) {
            clearTimeout(userMenuTimeout)
            userMenuTimeout = null
        }
        userMenuOpen.value = true
    }

    function closeUserMenuDelayed() {
        userMenuTimeout = setTimeout(() => {
            userMenuOpen.value = false
        }, 200)
    }

    function keepUserMenuOpen() {
        if (userMenuTimeout) {
            clearTimeout(userMenuTimeout)
            userMenuTimeout = null
        }
    }

    function closeUserMenu() {
        if (userMenuTimeout) {
            clearTimeout(userMenuTimeout)
            userMenuTimeout = null
        }
        userMenuOpen.value = false
    }

    async function handleLogout() {
        try {
            await authStore.logout()
            addToast('You have been logged out successfully.', 'success')
            closeMobileMenu()
            closeProfileMenu()
            closeUserMenu()
            navigateTo('/')
        } catch (error) {
            console.error('Logout error:', error)
            addToast('An error occurred during logout.', 'error')
        }
    }

    // Click outside handler for user menus (desktop and mobile)
    function handleClickOutside(event: MouseEvent) {
        // Close desktop user menu
        if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
            closeUserMenu()
        }
        // Close mobile profile menu
        if (mobileProfileMenuRef.value && !mobileProfileMenuRef.value.contains(event.target as Node)) {
            closeProfileMenu()
        }
    }

    // Hide header on scroll down, show on scroll up
    const hideHeader = ref(false)
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
    let ticking = false

    function onScroll() {
        if (typeof window === 'undefined') return;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentY = window.scrollY
                if (currentY > lastScrollY && currentY > 80) {
                    hideHeader.value = true
                } else {
                    hideHeader.value = false
                }
                lastScrollY = currentY
                ticking = false
            })
            ticking = true
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', onScroll)
        document.addEventListener('click', handleClickOutside)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll)
        document.removeEventListener('click', handleClickOutside)
        document.body.style.overflow = '' // Ensure body scroll is restored
        if (userMenuTimeout) {
            clearTimeout(userMenuTimeout)
        }
    })
    import type { CategoryTree } from '~/types'

    const route = useRoute()
    const { categories } = useCategories()

    interface NavChild {
        name: string
        href: string
    }

    interface NavSubcategory {
        name: string
        href: string
        children?: NavChild[]
    }

    interface NavItem {
        name: string
        href: string
        children?: NavSubcategory[]
    }

    // Mobile menu state
    const mobileMenuOpen = ref(false)
    const mobileSearchOpen = ref(false)
    const mobileActiveSubmenu = ref<string | null>(null)
    const mobileActiveNestedSubmenu = ref<string | null>(null)

    // Profile menu state
    const profileMenuOpen = ref(false)

    function toggleMobileMenu() {
        mobileMenuOpen.value = !mobileMenuOpen.value
        if (mobileMenuOpen.value) {
            profileMenuOpen.value = false // Close profile menu if open
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            mobileActiveSubmenu.value = null
            mobileActiveNestedSubmenu.value = null
        }
    }

    function closeMobileMenu() {
        mobileMenuOpen.value = false
        document.body.style.overflow = ''
        mobileActiveSubmenu.value = null
        mobileActiveNestedSubmenu.value = null
    }

    function toggleProfileMenu() {
        profileMenuOpen.value = !profileMenuOpen.value
    }

    function closeProfileMenu() {
        profileMenuOpen.value = false
    }

    function toggleMobileSearch() {
        mobileSearchOpen.value = !mobileSearchOpen.value
    }

    function toggleMobileSubmenu(name: string) {
        mobileActiveSubmenu.value = mobileActiveSubmenu.value === name ? null : name
        mobileActiveNestedSubmenu.value = null
    }

    function toggleMobileNestedSubmenu(name: string) {
        mobileActiveNestedSubmenu.value = mobileActiveNestedSubmenu.value === name ? null : name
    }

    // Transform a CategoryTree node's children into NavSubcategory format
    function buildNavChildren(node: CategoryTree): NavSubcategory[] {
        return node.children.map(child => ({
            name: child.name,
            href: `/categories/${child.slug}`,
            children: child.children.length
                ? child.children.map(nested => ({
                    name: nested.name,
                    href: `/categories/${nested.slug}`,
                }))
                : undefined,
        }))
    }

    // Build navigation items from API categories tree
    const navItems = computed<NavItem[]>(() => {
        const items: NavItem[] = []

        if (categories.value) {
            for (const rootCategory of categories.value) {
                items.push({
                    name: rootCategory.name,
                    href: `/categories/${rootCategory.slug}`,
                    children: [
                        { name: `All ${rootCategory.name}`, href: `/categories/${rootCategory.slug}` },
                        ...buildNavChildren(rootCategory),
                    ],
                })
            }
        }

        // Static nav items
        items.push({
            name: 'Services', href: '/services', children: [
                { name: 'Services', href: '/services' },
                { name: 'University Management System', href: '/services/university-management-system' },
                { name: 'Scholarship Management System', href: '/services/scholarship-management-system' },
            ]
        })

        return items
    })

    const activeDropdown = ref<string | null>(null)
    const activeSubcategory = ref<NavSubcategory | null>(null)
    let closeTimeout: ReturnType<typeof setTimeout> | null = null
    let openTimeout: ReturnType<typeof setTimeout> | null = null

    const activeNavItem = computed(() => {
        return navItems.value.find(item => item.name === activeDropdown.value)
    })

    function openDropdown(name: string) {
        if (closeTimeout) {
            clearTimeout(closeTimeout)
            closeTimeout = null
        }
        if (openTimeout) {
            clearTimeout(openTimeout)
            openTimeout = null
        }
        const item = navItems.value.find(i => i.name === name)
        if (item?.children) {
            openTimeout = setTimeout(() => {
                activeDropdown.value = name
                activeSubcategory.value = null
            }, 300)
        }
    }

    function closeDropdown() {
        if (openTimeout) {
            clearTimeout(openTimeout)
            openTimeout = null
        }
        closeTimeout = setTimeout(() => {
            activeDropdown.value = null
            activeSubcategory.value = null
        }, 150)
    }

    function keepDropdownOpen() {
        if (closeTimeout) {
            clearTimeout(closeTimeout)
            closeTimeout = null
        }
    }

    function setActiveSubcategory(subcat: NavSubcategory) {
        activeSubcategory.value = subcat
    }

    function clearActiveSubcategory() {
        // Keep the subcategory visible for better UX
    }

    // Close dropdown and menus when route changes
    watch(() => route.fullPath, () => {
        activeDropdown.value = null
        activeSubcategory.value = null
        closeMobileMenu()
        closeProfileMenu()
        closeUserMenu()
    })
</script>