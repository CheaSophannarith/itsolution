<template>
    <div class="min-h-screen">
        <!-- Hero Section with Breadcrumb -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16"
            style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
                    <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
                    <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                    <NuxtLink to="/services" class="hover:text-white">Services</NuxtLink>
                    <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                    <span class="text-white">{{ service?.name }}</span>
                </nav>

                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4">
                    {{ service?.name }}
                </h1>
                <p class="text-white/90 max-w-2xl text-sm sm:text-base">
                    {{ service?.description }}
                </p>
            </div>
        </div>

        <!-- Main Content Section -->
        <div class="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
            <div v-if="service" class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <!-- Service Image -->
                <div class="order-1 lg:order-1">
                    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <img :src="service.image" :alt="service.name" class="w-full h-auto object-cover" />
                    </div>
                </div>

                <!-- Service Details -->
                <div class="order-2 lg:order-2">
                    <div class="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
                        <h2 class="text-xl sm:text-2xl font-bold text-blue-950 mb-4">
                            About This Solution
                        </h2>
                        <p class="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                            {{ service.description }}
                        </p>

                        <!-- Action Buttons -->
                        <div class="space-y-4">
                            <a v-if="service.powerpoint" :href="service.powerpoint" target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center justify-center gap-2 w-full bg-pink-500 text-white px-6 py-3 rounded font-medium hover:bg-pink-600 transition-colors">
                                <Eye class="w-5 h-5" />
                                View Detail Documentation
                            </a>
                            <a href="https://t.me/hengitsolution" target="_blank" rel="noopener noreferrer"
                                class="flex items-center justify-center gap-2 w-full bg-blue-950 text-white px-6 py-3 rounded font-medium hover:bg-blue-900 transition-colors">
                                <MessageCircle class="w-5 h-5" />
                                Contact Us for This Service
                            </a>
                        </div>
                    </div>

                    <!-- Features Section -->
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 mt-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">Why Choose Our Solution?</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start gap-3">
                                <div
                                    class="w-6 h-6 bg-pink-500/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <Check class="w-4 h-4 text-pink-500" />
                                </div>
                                <span class="text-gray-600 text-sm">Tailored to your specific business needs</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <div
                                    class="w-6 h-6 bg-pink-500/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <Check class="w-4 h-4 text-pink-500" />
                                </div>
                                <span class="text-gray-600 text-sm">Comprehensive support and maintenance</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <div
                                    class="w-6 h-6 bg-pink-500/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <Check class="w-4 h-4 text-pink-500" />
                                </div>
                                <span class="text-gray-600 text-sm">Scalable and future-proof architecture</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <div
                                    class="w-6 h-6 bg-pink-500/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <Check class="w-4 h-4 text-pink-500" />
                                </div>
                                <span class="text-gray-600 text-sm">User-friendly interface design</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Not Found State -->
            <div v-else class="text-center py-16">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                <p class="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
                <NuxtLink to="/services"
                    class="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded font-medium hover:bg-pink-600 transition-colors">
                    <ArrowLeft class="w-5 h-5" />
                    Back to Services
                </NuxtLink>
            </div>

            <!-- Back Link -->
            <div v-if="service" class="mt-8">
                <NuxtLink to="/services"
                    class="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors">
                    <ArrowLeft class="w-4 h-4" />
                    Back to All Services
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronRight, MessageCircle, Eye, Check, ArrowLeft } from 'lucide-vue-next'
    import servicesData from '~/assets/data/Service/system.json'

    interface Service {
        id: number
        name: string
        description: string
        image: string
        powerpoint: string
        slug: string
    }

    const route = useRoute()
    const slug = route.params.slug as string

    const service = computed<Service | undefined>(() => {
        return (servicesData as Service[]).find(s => s.slug === slug)
    })

    useHead({
        title: computed(() => service.value ? `${service.value.name} - Services` : 'Service Not Found'),
        meta: [
            {
                name: 'description',
                content: computed(() => service.value?.description ?? 'Service details')
            }
        ]
    })
</script>
