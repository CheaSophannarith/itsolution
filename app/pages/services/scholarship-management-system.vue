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
                    <span class="text-white">Scholarship Management System</span>
                </nav>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Scholarship Management System
                        </h1>
                        <p class="text-white/90 text-lg mb-6">
                            Streamlining the Entire Scholarship Lifecycle—From Application to Selection
                        </p>
                        <p class="text-white/70 mb-8">
                            A project for the <strong class="text-white">Ministry of Education</strong>,
                            implemented by <strong class="text-white">IT Solution Digital</strong>.
                            Funded by the <strong class="text-white">Government of Cambodia</strong>.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <a href="https://t.me/hengitsolution" target="_blank"
                                class="inline-flex items-center gap-2 bg-white text-blue-950 px-6 py-3 font-medium hover:bg-gray-100 hover:scale-105 transition-all duration-200">
                                <MessageCircle class="w-5 h-5" />
                                Contact Us
                            </a>
                            <a href="/documents/Scholarship.pptx" target="_blank"
                                class="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 font-medium hover:bg-white/10 hover:scale-105 transition-all duration-200">
                                <FileText class="w-5 h-5" />
                                Documentation
                            </a>
                        </div>
                    </div>
                    <div class="hidden lg:block">
                        <NuxtImg src="/Images/Scholarship/DGHE Admin/Dashboard.png" alt="Scholarship Dashboard"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-2xl hover:scale-[1.02] transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </div>

        <!-- What is Scholarship Management System Section -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">What is the Scholarship Management
                            System?</h2>
                        <p class="text-gray-600 mb-4">
                            The Scholarship Management System is a comprehensive digital platform designed to manage
                            the entire scholarship lifecycle—from application submission to final selection—with
                            enhanced efficiency, transparency, and equity.
                        </p>
                        <p class="text-gray-600 mb-6">
                            This system modernizes the scholarship allocation process, ensuring fair opportunities
                            for all eligible students while providing oversight tools for educational authorities.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                                <Check class="w-5 h-5 text-pink-500 mt-0.5" />
                                <span class="text-gray-700">Streamlined application and selection process</span>
                            </li>
                            <li class="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                                <Check class="w-5 h-5 text-pink-500 mt-0.5" />
                                <span class="text-gray-700">Transparent and equitable scholarship distribution</span>
                            </li>
                            <li class="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                                <Check class="w-5 h-5 text-pink-500 mt-0.5" />
                                <span class="text-gray-700">Real-time tracking and reporting capabilities</span>
                            </li>
                        </ul>
                    </div>
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/Landing Page.png" alt="Scholarship Landing Page" width="800"
                            height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </section>

        <!-- System User Roles Section -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-12">
                    <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">System User Roles</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        The system is designed with four distinct user roles, each with specific responsibilities
                        to ensure smooth scholarship management operations.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- DGHE Admin -->
                    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                            <Settings class="w-6 h-6 text-white" />
                        </div>
                        <h3 class="text-lg font-bold text-blue-950 mb-2">DGHE Admin</h3>
                        <p class="text-gray-600 text-sm">
                            Central administration for system configuration, managing high schools, ministries,
                            institutions, specialties, candidates, applications, and generating reports.
                        </p>
                    </div>

                    <!-- School Account -->
                    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                            <GraduationCap class="w-6 h-6 text-white" />
                        </div>
                        <h3 class="text-lg font-bold text-blue-950 mb-2">School Account</h3>
                        <p class="text-gray-600 text-sm">
                            Schools can import their students (candidates), manage candidate profiles,
                            handle applications, and generate school-level reports.
                        </p>
                    </div>

                    <!-- Ministry Account -->
                    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                            <Building2 class="w-6 h-6 text-white" />
                        </div>
                        <h3 class="text-lg font-bold text-blue-950 mb-2">Ministry Account</h3>
                        <p class="text-gray-600 text-sm">
                            Provincial ministries can view dashboards, review candidates, applications,
                            and verify applications from schools within their jurisdiction.
                        </p>
                    </div>

                    <!-- Student Account -->
                    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                            <UserCircle class="w-6 h-6 text-white" />
                        </div>
                        <h3 class="text-lg font-bold text-blue-950 mb-2">Student Account</h3>
                        <p class="text-gray-600 text-sm">
                            Students receive credentials from their school to access the system
                            and submit scholarship applications directly.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-12">
                    <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">Key Features</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        Comprehensive tools for managing scholarship programs across Cambodia.
                    </p>
                </div>

                <!-- Feature 1: System Configuration -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/DGHE Admin/Setting.png" alt="System Settings" width="800"
                            height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-blue-950 mb-3">System Configuration</h3>
                        <p class="text-gray-600 mb-4">
                            Configure annual scholarship settings, define eligibility criteria,
                            and set up the system parameters for each academic year.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Annual scholarship cycle configuration
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Eligibility criteria management
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Application deadline settings
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Feature 2: High School Management -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div class="order-2 lg:order-1">
                        <h3 class="text-xl font-bold text-blue-950 mb-3">High School Management</h3>
                        <p class="text-gray-600 mb-4">
                            Register and manage all participating high schools across the country,
                            ensuring comprehensive coverage of eligible students.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                School registration and profiles
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Account management for schools
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Provincial grouping and assignment
                            </li>
                        </ul>
                    </div>
                    <div class="order-1 lg:order-2 overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/DGHE Admin/Highschool.png" alt="High School Management"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>

                <!-- Feature 3: Ministries Management -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/DGHE Admin/Ministries.png" alt="Ministries Management"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-blue-950 mb-3">Ministries Management</h3>
                        <p class="text-gray-600 mb-4">
                            Manage provincial ministry accounts and define their jurisdictions
                            for application verification and oversight.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Ministry account creation
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Jurisdiction assignment
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Verification workflow setup
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Feature 4: Institutions Management -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div class="order-2 lg:order-1">
                        <h3 class="text-xl font-bold text-blue-950 mb-3">Scholarship Institutions</h3>
                        <p class="text-gray-600 mb-4">
                            Register higher education institutions that provide scholarship opportunities
                            and manage their program offerings.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Institution registration
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Scholarship quota management
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Program and specialty setup
                            </li>
                        </ul>
                    </div>
                    <div class="order-1 lg:order-2 overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/DGHE Admin/Institutions.png" alt="Institutions Management"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>

                <!-- Feature 5: Specialties Management -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/DGHE Admin/Specialties.png" alt="Specialties Management"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-blue-950 mb-3">Specialties Management</h3>
                        <p class="text-gray-600 mb-4">
                            Define and manage available specialties across institutions,
                            including quota allocations for each program.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Specialty catalog management
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Scholarship slot allocation
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Institution-specialty mapping
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Feature 6: Candidates Management -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div class="order-2 lg:order-1">
                        <h3 class="text-xl font-bold text-blue-950 mb-3">Candidates Management</h3>
                        <p class="text-gray-600 mb-4">
                            Centralized database of all scholarship candidates from schools across the country.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Candidate profiles and details
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Eligibility verification
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Search and filter capabilities
                            </li>
                        </ul>
                    </div>
                    <div class="order-1 lg:order-2 overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/DGHE Admin/Candidates.png" alt="Candidates Management"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>

                <!-- Feature 7: Applications Management -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/DGHE Admin/Applications.png" alt="Applications Management"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-blue-950 mb-3">Applications Management</h3>
                        <p class="text-gray-600 mb-4">
                            Centralized view of all scholarship applications with filtering, search,
                            and approval workflow capabilities.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Application status tracking
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Selection and approval workflow
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Batch processing capabilities
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Feature 8: Reports -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="order-2 lg:order-1">
                        <h3 class="text-xl font-bold text-blue-950 mb-3">Reports & Analytics</h3>
                        <p class="text-gray-600 mb-4">
                            Generate comprehensive reports on scholarship distribution,
                            application statistics, and program effectiveness.
                        </p>
                        <ul class="space-y-2 text-gray-600">
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Statistical analysis reports
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Provincial distribution reports
                            </li>
                            <li class="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                                <div class="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                Export to multiple formats
                            </li>
                        </ul>
                    </div>
                    <div class="order-1 lg:order-2 overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/DGHE Admin/Reports.png" alt="Reports" width="800" height="500"
                            format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </section>

        <!-- School Portal Section -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-12">
                    <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">School Portal</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        Schools can manage their students, handle applications, and generate reports through their
                        dedicated portal.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- School Dashboard -->
                    <div
                        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <NuxtImg src="/Images/Scholarship/School Account/School-Dashboard.png" alt="School Dashboard"
                            width="800" height="192" format="webp" loading="lazy" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-blue-950 mb-2">School Dashboard</h3>
                            <p class="text-gray-600 text-sm">
                                Overview of school statistics, candidate counts, and application progress.
                            </p>
                        </div>
                    </div>

                    <!-- Candidate Management -->
                    <div
                        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <NuxtImg src="/Images/Scholarship/School Account/School Candidates.png" alt="School Candidates"
                            width="800" height="192" format="webp" loading="lazy" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-blue-950 mb-2">Candidate Management</h3>
                            <p class="text-gray-600 text-sm">
                                Import and manage student candidates, assign credentials, and track eligibility.
                            </p>
                        </div>
                    </div>

                    <!-- Application Management -->
                    <div
                        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <NuxtImg src="/Images/Scholarship/School Account/School Applications.png"
                            alt="School Applications" width="800" height="192" format="webp" loading="lazy"
                            class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-blue-950 mb-2">Application Management</h3>
                            <p class="text-gray-600 text-sm">
                                Review and manage scholarship applications submitted by students.
                            </p>
                        </div>
                    </div>

                    <!-- School Reports -->
                    <div
                        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <NuxtImg src="/Images/Scholarship/School Account/School Reports.png" alt="School Reports"
                            width="800" height="192" format="webp" loading="lazy" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h3 class="text-lg font-bold text-blue-950 mb-2">School Reports</h3>
                            <p class="text-gray-600 text-sm">
                                Generate school-level reports on applications and scholarship outcomes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Ministry Portal Section -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/Ministry Account/Ministries.png" alt="Ministry Portal"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                        <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">Ministry Portal</h2>
                        <p class="text-gray-600 mb-4">
                            Provincial ministries have access to a dedicated portal for overseeing and verifying
                            scholarship applications from schools within their jurisdiction.
                        </p>
                        <p class="text-gray-600 mb-6">
                            The ministry portal provides tools for reviewing candidate information, verifying
                            applications, and ensuring compliance with scholarship requirements.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Dashboard overview
                            </div>
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Candidate review
                            </div>
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Application verification
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Student Portal Section -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">Student Portal</h2>
                        <p class="text-gray-600 mb-4">
                            Students receive their login credentials from their school and can access the system
                            to submit scholarship applications directly.
                        </p>
                        <p class="text-gray-600 mb-6">
                            The student portal provides an intuitive interface for browsing available specialties,
                            submitting applications, and tracking application status.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Easy application
                            </div>
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Status tracking
                            </div>
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Secure access
                            </div>
                        </div>
                    </div>
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/Student Account/Application Form.png"
                            alt="Student Application" width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Public Specialties Portal Section -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="overflow-hidden rounded-lg">
                        <NuxtImg src="/Images/Scholarship/Specialties by Institution.png" alt="Specialties Portal"
                            width="800" height="500" format="webp" loading="lazy"
                            class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                        <h2 class="text-2xl sm:text-3xl font-bold text-blue-950 mb-4">Public Specialties Portal</h2>
                        <p class="text-gray-600 mb-4">
                            A public-facing page where all students can view available specialties offered by
                            scholarship institutions.
                        </p>
                        <p class="text-gray-600 mb-6">
                            The portal displays real-time data showing the total number of students who have applied
                            for each specialty, helping students make informed decisions.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Browse specialties
                            </div>
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Real-time statistics
                            </div>
                            <div class="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition-colors">
                                <Check class="w-5 h-5 text-pink-500" />
                                Institution details
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-blue-950">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Interested in the Scholarship Management System?
                </h2>
                <p class="text-white/80 mb-8">
                    Contact us to learn more about how this system can help manage scholarship programs effectively.
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
        GraduationCap,
        Building2,
        UserCircle
    } from 'lucide-vue-next'
    const siteUrl = useRuntimeConfig().public.siteUrl as string;

    useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/services/scholarship-management-system` }] });

    useSeoMeta({
        title: 'Scholarship Management System – Digital Scholarship Platform',
        description: 'A comprehensive digital platform managing Cambodia\'s entire scholarship lifecycle—from application to final selection. Funded by the Government of Cambodia, implemented by IT Solution Digital for the Ministry of Education.',
        ogTitle: 'Scholarship Management System | IT Solution Digital Cambodia',
        ogDescription: 'Streamlining Cambodia\'s scholarship lifecycle from application to selection with transparency and efficiency. A Ministry of Education project by IT Solution Digital.',
        ogImage: `${siteUrl}/logo.jpg`,
        ogType: 'website',
        ogUrl: `${siteUrl}/services/scholarship-management-system`,
        twitterCard: 'summary_large_image',
        keywords: 'scholarship management Cambodia, DGHE scholarship system, Cambodia government scholarship, Ministry of Education Cambodia scholarship, IT Solution Digital',
    })
</script>
