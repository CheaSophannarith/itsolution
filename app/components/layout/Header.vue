<template>
    <header class="relative">
        <!-- Top Section - White Background -->
        <div class="bg-white border-b border-gray-200 mx-auto max-w-7xl">
            <div class="w-full px-6 py-4">
                <div class="flex items-center justify-between gap-4">
                    <!-- Logo & Search Bar -->
                    <div class="flex flex-1 items-center gap-12">
                        <NuxtLink to="/" class="shrink-0">
                            <img src="/SHI_LOGO.png" alt="SHI" class="h-8" />
                        </NuxtLink>
                        <div class="relative flex-1 max-w-md">
                            <Input type="text" placeholder="Search..."
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                <Search />
                            </button>
                        </div>
                    </div>

                    <!-- Right Section -->
                    <div class="flex items-center gap-4 text-sm">
                        <!-- Cart -->
                        <button
                            class="relative text-brand hover:text-white hover:bg-brand hover:px-2 hover:py-2 rounded-md transition-all">
                            <ShoppingCart />
                            <span
                                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
                        </button>

                        <span class="text-gray-300">|</span>

                        <!-- Contact Us -->
                        <NuxtLink to="/contact"
                            class="text-brand hover:text-white hover:bg-brand hover:px-2 hover:py-2 rounded-md transition-all font-bold">
                            Contact Us
                        </NuxtLink>

                        <span class="text-gray-300">|</span>

                        <!-- Sign In -->
                        <NuxtLink to="/signin"
                            class="flex items-center gap-2 text-brand hover:text-white hover:bg-brand hover:px-2 hover:py-2 rounded-md transition-all font-bold">
                            <CircleUser />
                            Sign In
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Section - Brand Background -->
        <div class="bg-brand">
            <div class="w-full px-6 mx-auto max-w-7xl">
                <div class="flex items-center justify-between">
                    <!-- Navigation Links -->
                    <nav class="flex items-center">
                        <div v-for="item in navItems" :key="item.name" class="relative"
                            @mouseenter="openDropdown(item.name)" @mouseleave="closeDropdown">
                            <component
                                :is="item.children ? 'button' : 'NuxtLink'"
                                :to="item.children ? undefined : item.href"
                                :class="[
                                    'px-6 py-3 text-brand-foreground font-medium transition-colors flex items-center gap-1 cursor-pointer',
                                    activeDropdown === item.name ? 'bg-white/20' : 'hover:bg-white/10'
                                ]"
                            >
                                {{ item.name }}
                                <ChevronDown v-if="item.children" class="w-4 h-4" />
                            </component>
                        </div>
                    </nav>

                    <!-- Phone Number -->
                    <a href="tel:888-764-8888" class="text-brand-foreground font-semibold py-3">
                        888-764-8888
                    </a>
                </div>
            </div>
        </div>

        <!-- Mega Menu Dropdown -->
        <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
            <div v-if="activeDropdown && activeNavItem?.children"
                class="absolute left-0 right-0 bg-gray-200 border-b border-gray-200 shadow-lg z-50"
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
                            <div class="grid grid-cols-3 gap-2">
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
    import { Search, ShoppingCart, CircleUser, ChevronDown, ChevronRight } from 'lucide-vue-next'
    import { useRoute } from 'vue-router'

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

    // Fetch categories from JSON
    const { data: hardwareCategories } = await useFetch<Category[]>('/data/Hardware/categories.json')
    const { data: softwareCategories } = await useFetch<Category[]>('/data/Software/categories.json')

    // Transform hardware categories to navigation format
    const hardwareNavChildren = computed<NavSubcategory[]>(() => {
        if (!hardwareCategories.value) return []

        return [
            { name: 'All Hardware', href: '/hardware' },
            ...hardwareCategories.value.map(category => ({
                name: category.name,
                href: `/hardware/${category.slug}`,
                children: category.subcategories?.length
                    ? category.subcategories.map(sub => ({
                        name: sub.name,
                        href: `/hardware/${category.slug}/${sub.slug}`
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
    })
</script>
