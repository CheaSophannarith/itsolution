<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20"
            style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-2 text-white/80 text-sm mb-6">
                    <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
                    <ChevronRight class="w-4 h-4" />
                    <NuxtLink to="/services" class="hover:text-white">Services</NuxtLink>
                    <ChevronRight class="w-4 h-4" />
                    <span class="text-white">HEMIS</span>
                </nav>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Higher Education Management Information System
                        </h1>
                        <p class="text-white/90 text-lg mb-6">
                            The National Platform for Higher Education Data Management and Ministry Oversight
                        </p>
                        <p class="text-white/70 mb-8">
                            A project for the <strong class="text-white">Ministry of Education, Youth and
                                Sport</strong>,
                            implemented by <strong class="text-white">IT Solution Digital</strong>.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <a href="https://t.me/hengitsolution" target="_blank"
                                class="inline-flex items-center gap-2 bg-white text-blue-950 px-6 py-3 font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-200">
                                <MessageCircle class="w-5 h-5" />
                                Contact Us
                            </a>
                            <a href="/documents/HEMIS.pptx" target="_blank"
                                class="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 font-medium hover:bg-white/10 hover:scale-105 transition-all duration-200">
                                <FileText class="w-5 h-5" />
                                Documentation
                            </a>
                        </div>
                    </div>
                    <div class="hidden lg:block">
                        <NuxtImg src="/Images/Hemis/Hemis Admin/Dashboard.png" alt="HEMIS Dashboard"
                            width="800" height="500" format="webp"
                            class="w-full rounded-lg shadow-2xl hover:scale-[1.02] transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </div>

        <!-- What is HEMIS Section -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">What is HEMIS?</h2>
                        <p class="text-gray-600 mb-4">
                            HEMIS is the official flagship platform of Cambodia's Ministry of Education, Youth and
                            Sports.
                            It centralizes and standardizes all higher education information into a single national
                            database.
                        </p>
                        <p class="text-gray-600 mb-6">
                            The system revolutionizes oversight by modernizing institutional management and enabling
                            evidence-based strategic planning for more effective decision-making.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                                <Check class="w-5 h-5 text-pink-500 mt-0.5" />
                                <span class="text-gray-700">Complete visibility of all higher education
                                    institutions</span>
                            </li>
                            <li class="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                                <Check class="w-5 h-5 text-pink-500 mt-0.5" />
                                <span class="text-gray-700">Systematic monitoring to improve educational
                                    standards</span>
                            </li>
                            <li class="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                                <Check class="w-5 h-5 text-pink-500 mt-0.5" />
                                <span class="text-gray-700">Data-driven policy and resource allocation</span>
                            </li>
                        </ul>
                    </div>
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Hemis/Hemis Admin/Graphic-Data.png" alt="HEMIS Analytics"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </section>

        <!-- System User Roles Section -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-12">
                    <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">System User Roles</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        HEMIS is designed with two distinct user roles to ensure efficient data management
                        and oversight across all higher education institutions.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <!-- HEMIS Admin -->
                    <div class="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                            <Settings class="w-6 h-6 text-white" />
                        </div>
                        <h3 class="text-lg font-bold text-blue-950 mb-2">HEMIS Admin</h3>
                        <p class="text-gray-600 text-sm">
                            Central administration for the Ministry of Education to manage all higher education
                            institutions, monitor data submissions, generate national reports, and oversee
                            the entire higher education sector.
                        </p>
                    </div>

                    <!-- University Account -->
                    <div class="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                            <GraduationCap class="w-6 h-6 text-white" />
                        </div>
                        <h3 class="text-lg font-bold text-blue-950 mb-2">University Account</h3>
                        <p class="text-gray-600 text-sm">
                            Each institution has access to their own portal for managing and submitting
                            student data, staff information, academic programs, and institutional reports
                            to the central HEMIS system.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-12">
                    <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">Key Features</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        HEMIS provides comprehensive tools for managing higher education data across Cambodia.
                    </p>
                </div>

                <!-- Feature 1: Student Management -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Hemis/Hemis Admin/Students.png" alt="Student Management"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-blue-950 mb-3">Student Management</h3>
                        <p class="text-gray-600 mb-4">
                            Comprehensive student data management including enrollment, academic records,
                            and graduation tracking across all institutions.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Student enrollment and registration
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Academic performance tracking
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Graduation and certification records
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Feature 2: Staff Management -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div class="order-2 lg:order-1">
                        <h3 class="text-xl font-bold text-blue-950 mb-3">Staff & Faculty Management</h3>
                        <p class="text-gray-600 mb-4">
                            Manage faculty and administrative staff information, qualifications,
                            and assignments across all higher education institutions.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Staff profiles and qualifications
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Teaching assignments and workload
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Professional development tracking
                            </li>
                        </ul>
                    </div>
                    <div class="order-1 lg:order-2 overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Hemis/Hemis Admin/Staffs.png" alt="Staff Management"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>

                <!-- Feature 3: Institution Management -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Hemis/Hemis Admin/Institutions.png" alt="Institution Management"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-blue-950 mb-3">Institution Management</h3>
                        <p class="text-gray-600 mb-4">
                            Central registry of all higher education institutions with detailed profiles,
                            accreditation status, and program offerings.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Institution profiles and details
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Program and course management
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Accreditation and compliance tracking
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Feature 4: Reports -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="order-2 lg:order-1">
                        <h3 class="text-xl font-bold text-blue-950 mb-3">Reports & Analytics</h3>
                        <p class="text-gray-600 mb-4">
                            Generate comprehensive reports and analytics for data-driven decision making
                            at institutional and national levels.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Customizable report generation
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Visual dashboards and charts
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Export to multiple formats
                            </li>
                        </ul>
                    </div>
                    <div class="order-1 lg:order-2 overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Hemis/Hemis Admin/Reports.png" alt="Reports"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </section>

        <!-- University Portal Section -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">University Portal</h2>
                        <p class="text-gray-600 mb-4">
                            Each institution has access to their own portal for managing and submitting data
                            to the central HEMIS system.
                        </p>
                        <p class="text-gray-600 mb-6">
                            The university portal provides a user-friendly interface for administrators to
                            input student data, staff information, and institutional reports.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Easy data entry
                            </div>
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Real-time sync
                            </div>
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Secure access
                            </div>
                        </div>
                    </div>
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Hemis/University Account/Landing-Page.png" alt="University Portal"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-blue-950">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Interested in HEMIS?
                </h2>
                <p class="text-white/80 mb-8">
                    Contact us to learn more about how HEMIS can help your institution.
                </p>
                <div class="flex flex-wrap gap-4 justify-center">
                    <a href="https://t.me/hengitsolution" target="_blank"
                        class="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 font-medium hover:bg-pink-600 hover:scale-105 transition-all duration-200">
                        <MessageCircle class="w-5 h-5" />
                        Contact Us
                    </a>
                    <NuxtLink to="/services"
                        class="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 font-medium hover:bg-white/10 hover:scale-105 transition-all duration-200">
                        <ArrowLeft class="w-5 h-5" />
                        Back to Services
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import {
        ChevronRight,
        MessageCircle,
        FileText,
        Check,
        ArrowLeft,
        Settings,
        GraduationCap
    } from 'lucide-vue-next'
    const siteUrl = useRuntimeConfig().public.siteUrl as string;

    useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/services/university-management-system` }] });

    useSeoMeta({
        title: 'HEMIS – Higher Education Management Information System',
        description: 'HEMIS is Cambodia\'s national platform for higher education data management, implemented by IT Solution Digital for the Ministry of Education, Youth and Sport. Centralizing student, staff, and institutional data nationwide.',
        ogTitle: 'HEMIS – Higher Education Management Information System | IT Solution Digital',
        ogDescription: 'Cambodia\'s official national platform for higher education data management. Implemented by IT Solution Digital for the Ministry of Education, Youth and Sport.',
        ogImage: '/Images/Hemis/Hemis Admin/Dashboard.png',
        ogType: 'website',
        twitterCard: 'summary_large_image',
        keywords: 'HEMIS Cambodia, higher education management information system, university management Cambodia, Ministry of Education Cambodia, IT Solution Digital HEMIS',
    })
</script>
