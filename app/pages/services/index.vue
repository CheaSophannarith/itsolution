<template>
    <div class="min-h-screen">
        <!-- Hero Section with Breadcrumb -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16"
            style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4">
                    Our Services
                </h1>
                <p class="text-white/90 max-w-2xl text-sm sm:text-base mb-6">
                    We provide comprehensive software solutions and custom development services to help your business
                    thrive in the digital era. From university management systems to specialized applications, we
                    deliver tailored solutions that meet your unique needs.
                </p>
                <a href="https://t.me/hengitsolution" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 bg-white text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-none font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
                    <MessageCircle class="w-4 h-4 sm:w-5 sm:h-5" />
                    Contact Us for a Consultation
                </a>
            </div>
        </div>

        <!-- Main Content Section -->
        <div class="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
            <div class="mb-6 sm:mb-8">
                <h2 class="text-xl sm:text-2xl font-bold text-blue-950 mb-2">Our Software Solutions</h2>
                <p class="text-gray-600 text-sm sm:text-base">
                    Explore our portfolio of software solutions that we've developed to address various business needs.
                </p>
            </div>

            <!-- Services List -->
            <div class="space-y-4 sm:space-y-6">
                <div v-for="service in services" :key="service.id"
                    class="bg-white border border-gray-200 rounded-none overflow-hidden hover:shadow-lg transition-shadow">
                    <div class="flex flex-col sm:flex-row items-stretch">
                        <!-- Service Image -->
                        <div class="sm:w-48 md:w-56 lg:w-64 shrink-0">
                            <NuxtLink :to="getServiceLink(service)" class="block h-full">
                                <img :src="service.image" :alt="service.name"
                                    class="w-full h-48 sm:h-full object-cover" />
                            </NuxtLink>
                        </div>

                        <!-- Service Info -->
                        <div
                            class="flex-1 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div class="flex-1">
                                <NuxtLink :to="getServiceLink(service)"
                                    class="text-lg sm:text-xl font-bold text-gray-800 hover:text-pink-500 transition-colors">
                                    {{ service.name }}
                                </NuxtLink>
                                <p class="text-gray-600 text-sm sm:text-base mt-2 line-clamp-2">
                                    {{ service.description }}
                                </p>
                            </div>

                            <!-- Detail Docs Button - Absolute End -->
                            <div class="shrink-0">
                                <a v-if="service.powerpoint" :href="service.powerpoint" target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-3 rounded-none font-medium text-sm hover:bg-pink-600 transition-colors whitespace-nowrap">
                                    <Eye class="w-4 h-4" />
                                    Detail Docs
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact CTA Section -->
            <div class="mt-8 sm:mt-12 p-6 sm:p-8 lg:p-12 text-center">
                <h3 class="text-xl sm:text-2xl font-bold text-pink-500 mb-4">
                    Need a Custom Solution?
                </h3>
                <p class="text-black max-w-2xl mx-auto mb-6 text-sm sm:text-base">
                    We specialize in developing custom software solutions tailored to your specific business
                    requirements.
                    Get in touch with us to discuss your project.
                </p>
                <a href="https://t.me/hengitsolution" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 bg-blue-950 text-white px-6 py-3 rounded-none font-medium hover:bg-blue-700 transition-all duration-300">
                    <MessageCircle class="w-5 h-5" />
                    Contact Us on Telegram
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { MessageCircle, Eye } from 'lucide-vue-next'
    import servicesData from '~/assets/data/Service/system.json'
    const siteUrl = useRuntimeConfig().public.siteUrl as string;

    interface Service {
        id: number
        name: string
        description: string
        image: string
        powerpoint: string
        slug: string
    }

    const services = ref<Service[]>(servicesData)

    // Static pages mapping - services with dedicated static pages
    const staticPages: Record<string, string> = {
        'university-management-system': '/services/university-management-system'
    }

    const getServiceLink = (service: Service): string => {
        return staticPages[service.slug] || `/services/${service.slug}`
    }

    useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/services` }] });

    useSeoMeta({
        title: 'IT Software Solutions & Custom Development',
        description: 'Explore IT Solution Digital\'s software solutions: HEMIS (University Management), Scholarship Management System, and custom software development for government and businesses in Cambodia.',
        ogTitle: 'IT Software Solutions | IT Solution Digital Cambodia',
        ogDescription: 'Custom software development for Cambodia\'s government and businesses. HEMIS, Scholarship Management System, and more tailored digital solutions.',
        ogImage: '/logo.jpg',
        ogType: 'website',
        twitterCard: 'summary_large_image',
        keywords: 'software solutions Cambodia, custom software development, university management system, scholarship management Cambodia, IT Solution Digital services',
    })
</script>

<style scoped>
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>