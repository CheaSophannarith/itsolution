<template>
    <header class="relative">
        <!-- Top Section - White Background -->
        <div class="bg-white border-b border-gray-200 mx-auto max-w-7xl">
            <div class="w-full px-4 sm:px-6 py-3 sm:py-4">
                <div class="flex items-center justify-between gap-2 sm:gap-4">
                    <!-- Mobile Menu Button -->
                    <button @click="toggleMobileMenu" class="lg:hidden p-2 text-brand hover:bg-gray-100 rounded-md">
                        <Menu class="w-6 h-6" />
                    </button>

                    <!-- Logo -->
                    <NuxtLink to="/" class="shrink-0">
                        <img src="/SHI_LOGO.png" alt="SHI" class="h-6 sm:h-8" />
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
                        <button @click="toggleMobileSearch" class="md:hidden p-2 text-brand hover:bg-gray-100 rounded-md">
                            <Search class="w-5 h-5" />
                        </button>

                        <!-- Cart -->
                        <button
                            class="relative p-2 text-brand hover:text-white hover:bg-brand rounded-md transition-all">
                            <ShoppingCart class="w-5 h-5" />
                            <span
                                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
                        </button>

                        <!-- Contact Us - Hidden on mobile -->
                        <span class="hidden sm:block text-gray-300">|</span>
                        <NuxtLink to="/contact"
                            class="hidden sm:block text-brand hover:text-white hover:bg-brand hover:px-2 hover:py-2 rounded-md transition-all font-bold">
                            Contact Us
                        </NuxtLink>

                        <!-- Sign In - Hidden on mobile -->
                        <span class="hidden sm:block text-gray-300">|</span>
                        <NuxtLink to="/signin"
                            class="hidden sm:flex items-center gap-2 text-brand hover:text-white hover:bg-brand hover:px-2 hover:py-2 rounded-md transition-all font-bold">
                            <CircleUser class="w-5 h-5" />
                            <span class="hidden lg:inline">Sign In</span>
                        </NuxtLink>

                        <!-- Mobile Sign In Icon Only -->
                        <NuxtLink to="/signin"
                            class="sm:hidden p-2 text-brand hover:bg-gray-100 rounded-md">
                            <CircleUser class="w-5 h-5" />
                        </NuxtLink>
                    </div>
                </div>

                <!-- Mobile Search Bar -->
                <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-2"
                    enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
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
                            <component :is="item.children ? 'button' : 'NuxtLink'"
                                :to="item.children ? undefined : item.href" :class="[
                                    'px-4 xl:px-6 py-3 text-brand-foreground font-medium transition-colors flex items-center gap-1 cursor-pointer text-sm xl:text-base',
                                    activeDropdown === item.name ? 'bg-white/20' : 'hover:bg-white/10'
                                ]">
                                {{ item.name }}
                                <ChevronDown v-if="item.children" class="w-4 h-4" />
                            </component>
                        </div>
                    </nav>

                    <!-- Phone Number -->
                    <a href="tel:888-764-8888" class="text-brand-foreground font-semibold py-3 text-sm xl:text-base">
                        888-764-8888
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
                        <img src="/SHI_LOGO.png" alt="SHI" class="h-6 brightness-0 invert" />
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

                <!-- Mobile Menu Footer Links -->
                <div class="p-4 border-t border-gray-200 bg-gray-50">
                    <NuxtLink to="/contact" @click="closeMobileMenu"
                        class="flex items-center gap-3 py-2 text-brand font-medium">
                        <Phone class="w-5 h-5" />
                        Contact Us
                    </NuxtLink>
                    <a href="tel:888-764-8888" class="flex items-center gap-3 py-2 text-brand">
                        <Phone class="w-5 h-5" />
                        888-764-8888
                    </a>
                    <NuxtLink to="/signin" @click="closeMobileMenu"
                        class="flex items-center gap-3 py-2 text-brand font-medium">
                        <CircleUser class="w-5 h-5" />
                        Sign In
                    </NuxtLink>
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
    import { ref, computed, watch } from 'vue'
    import { Search, ShoppingCart, CircleUser, ChevronDown, ChevronRight, Menu, X, Phone } from 'lucide-vue-next'
    import { useRoute } from 'vue-router'
    // Import JSON directly - no fetch needed, data available immediately
    import hardwareCategoriesData from '~/assets/data/Hardware/categories.json'
    import softwareCategoriesData from '~/assets/data/Software/categories.json'

    const route = useRoute()

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

    interface Category {
        id: number
        name: string
        slug: string
        description?: string
        subcategories?: {
            id: number
            name: string
            slug: string
            description?: string
        }[]
    }

    // Use imported JSON data directly - always available, no fetch, no caching issues
    const hardwareCategories = ref<Category[]>(hardwareCategoriesData)
    const softwareCategories = ref<Category[]>(softwareCategoriesData)

    // Mobile menu state
    const mobileMenuOpen = ref(false)
    const mobileSearchOpen = ref(false)
    const mobileActiveSubmenu = ref<string | null>(null)
    const mobileActiveNestedSubmenu = ref<string | null>(null)

    function toggleMobileMenu() {
        mobileMenuOpen.value = !mobileMenuOpen.value
        if (mobileMenuOpen.value) {
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

    // Transform hardware categories to navigation format
    const hardwareNavChildren = computed<NavSubcategory[]>(() => {
        if (!hardwareCategories.value) return []

        return [
            { name: 'All Hardware', href: '/hardware' },
            ...hardwareCategories.value.map(category => ({
                name: category.name,
                href: `/hardware/categories/${category.slug}`,
                children: category.subcategories?.length
                    ? category.subcategories.map(sub => ({
                        name: sub.name,
                        href: `/hardware/categories/${category.slug}/${sub.slug}`
                    }))
                    : undefined
            }))
        ]
    })

    // Transform software categories to navigation format
    const softwareNavChildren = computed<NavSubcategory[]>(() => {
        if (!softwareCategories.value) return []

        return [
            { name: 'All Software', href: '/software' },
            ...softwareCategories.value.map(category => ({
                name: category.name,
                href: `/software/${category.slug}`,
                children: category.subcategories?.length
                    ? category.subcategories.map(sub => ({
                        name: sub.name,
                        href: `/software/${category.slug}/${sub.slug}`
                    }))
                    : undefined
            }))
        ]
    })

    const navItems = computed<NavItem[]>(() => [
        {
            name: 'Hardware',
            href: '/hardware',
            children: hardwareNavChildren.value
        },
        {
            name: 'Software',
            href: '/software',
            children: softwareNavChildren.value
        },
        {
            name: 'Partners',
            href: '/partners',
            children: [
                { name: 'Microsoft', href: '/partners/microsoft' },
                { name: 'Dell', href: '/partners/dell' },
                { name: 'HP', href: '/partners/hp' },
                { name: 'Cisco', href: '/partners/cisco' },
                { name: 'Lenovo', href: '/partners/lenovo' },
                { name: 'Apple', href: '/partners/apple' },
            ]
        },
        { name: 'IT Solutions', href: '/it-solutions' },
        { name: 'Services', href: '/services' },
        { name: 'Explore SHI', href: '/explore' },
        { name: 'Tools', href: '/tools' },
    ])

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

    // Close dropdown when route changes
    watch(() => route.fullPath, () => {
        activeDropdown.value = null
        activeSubcategory.value = null
        closeMobileMenu()
    })
</script>