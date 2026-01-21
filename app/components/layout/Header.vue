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

    const navItems: NavItem[] = [
        {
            name: 'Hardware',
            href: '/hardware',
            children: [
                {
                    name: 'All Hardware', href: '/hardware'
                },
                {
                    name: 'Cables', href: '/hardware/cables', children: [
                        { name: 'USB Cables', href: '/hardware/cables/usb' },
                        { name: 'HDMI Cables', href: '/hardware/cables/hdmi' },
                        { name: 'Network Cables', href: '/hardware/cables/network' },
                        { name: 'Power Cables', href: '/hardware/cables/power' },
                    ]
                },
                {
                    name: 'Cameras & Camcorders', href: '/hardware/cameras', children: [
                        { name: 'Digital Cameras', href: '/hardware/cameras/digital' },
                        { name: 'Webcams', href: '/hardware/cameras/webcams' },
                        { name: 'Security Cameras', href: '/hardware/cameras/security' },
                    ]
                },
                {
                    name: 'Computer Accessories', href: '/hardware/accessories', children: [
                        { name: 'Keyboards', href: '/hardware/accessories/keyboards' },
                        { name: 'Mice', href: '/hardware/accessories/mice' },
                        { name: 'Headsets', href: '/hardware/accessories/headsets' },
                        { name: 'Docking Stations', href: '/hardware/accessories/docking-stations' },
                    ]
                },
                {
                    name: 'Computers & Tablets', href: '/hardware/computers', children: [
                        { name: 'Laptops', href: '/hardware/computers/laptops' },
                        { name: 'Desktops', href: '/hardware/computers/desktops' },
                        { name: 'Tablets', href: '/hardware/computers/tablets' },
                        { name: 'Workstations', href: '/hardware/computers/workstations' },
                    ]
                },
                {
                    name: 'Data Storage', href: '/hardware/storage', children: [
                        { name: 'Hard Drives', href: '/hardware/storage/hard-drives' },
                        { name: 'SSDs', href: '/hardware/storage/ssd' },
                        { name: 'USB Flash Drives', href: '/hardware/storage/flash-drives' },
                        { name: 'Memory Cards', href: '/hardware/storage/memory-cards' },
                    ]
                },
                { name: 'Electronics & Devices', href: '/hardware/electronics' },
                {
                    name: 'Monitors & Projectors', href: '/hardware/monitors', children: [
                        { name: 'Computer Monitors', href: '/hardware/monitors/computer' },
                        { name: 'Projectors', href: '/hardware/monitors/projectors' },
                        { name: 'Video Walls', href: '/hardware/monitors/video-walls' },
                    ]
                },
                {
                    name: 'Networking & Security', href: '/hardware/networking', children: [
                        { name: 'Routers', href: '/hardware/networking/routers' },
                        { name: 'Switches', href: '/hardware/networking/switches' },
                        { name: 'Firewalls', href: '/hardware/networking/firewalls' },
                        { name: 'Access Points', href: '/hardware/networking/access-points' },
                    ]
                },
                { name: 'PC & Server Components', href: '/hardware/components' },
                { name: 'Phones & Video Conferencing', href: '/hardware/phones' },
                { name: 'Power Management', href: '/hardware/power' },
                { name: 'Printer & Printer Supplies', href: '/hardware/printers' },
                { name: 'Servers & Server Management', href: '/hardware/servers' },
            ]
        },
        {
            name: 'Software',
            href: '/software',
            children: [
                {
                    name: 'Operating Systems', href: '/software/os', children: [
                        { name: 'Windows', href: '/software/os/windows' },
                        { name: 'Linux', href: '/software/os/linux' },
                        { name: 'macOS', href: '/software/os/macos' },
                    ]
                },
                {
                    name: 'Security Software', href: '/software/security', children: [
                        { name: 'Antivirus', href: '/software/security/antivirus' },
                        { name: 'Endpoint Protection', href: '/software/security/endpoint' },
                        { name: 'VPN', href: '/software/security/vpn' },
                    ]
                },
                {
                    name: 'Productivity', href: '/software/productivity', children: [
                        { name: 'Microsoft 365', href: '/software/productivity/microsoft-365' },
                        { name: 'Google Workspace', href: '/software/productivity/google-workspace' },
                        { name: 'Adobe Creative Cloud', href: '/software/productivity/adobe' },
                    ]
                },
                { name: 'Development Tools', href: '/software/development' },
                { name: 'Database Software', href: '/software/database' },
                { name: 'Virtualization', href: '/software/virtualization' },
            ]
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
    ]

    const activeDropdown = ref<string | null>(null)
    const activeSubcategory = ref<NavSubcategory | null>(null)
    let closeTimeout: ReturnType<typeof setTimeout> | null = null
    let openTimeout: ReturnType<typeof setTimeout> | null = null

    const activeNavItem = computed(() => {
        return navItems.find(item => item.name === activeDropdown.value)
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
        const item = navItems.find(i => i.name === name)
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
