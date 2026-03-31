<template>
    <div class="min-h-screen">
        <!-- Hero Carousel -->
        <HomeHeroCarousel :slides="carouselSlides" />

        <!-- Featured Products -->
        <HomeFeaturedProducts :products="featuredProducts" />

        <!-- Shop by Brand -->
        <HomeBrandsCarousel :brands="brands" />

        <!-- Category Products Sections -->
        <div v-if="categoriesWithProducts && categoriesWithProducts.length > 0" class="bg-white py-4 sm:py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ClientOnly>
                    <div class="mb-4 sm:mb-6" data-aos="fade-up">
                        <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand">
                            Explore our popular categories
                        </span>
                    </div>

                    <!-- Mobile: horizontal scrollable category filter tabs -->
                    <div class="flex lg:hidden gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                        <button
                            v-for="category in categoriesWithProducts"
                            :key="category.uuid"
                            @click="activeCategory = category"
                            :class="[
                                'flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-colors',
                                activeCategory?.uuid === category.uuid
                                    ? 'bg-brand text-white border-brand'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-brand hover:text-brand',
                            ]">
                            {{ category.name }}
                        </button>
                    </div>

                    <!-- Layout: left sidebar (desktop) + right product grid -->
                    <div class="flex gap-6 items-start">
                        <!-- Left: category filter sidebar (desktop only) -->
                        <aside class="hidden lg:block w-52 flex-shrink-0">
                            <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 px-3">Categories</p>
                            <ul class="space-y-0.5">
                                <li v-for="category in categoriesWithProducts" :key="category.uuid">
                                    <button
                                        @click="activeCategory = category"
                                        :class="[
                                            'w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg flex items-center gap-3 transition-colors',
                                            activeCategory?.uuid === category.uuid
                                                ? 'bg-brand text-white'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-brand',
                                        ]">
                                        <img
                                            v-if="category.image"
                                            :src="category.image"
                                            :alt="category.name"
                                            class="w-8 h-8 object-cover rounded flex-shrink-0" />
                                        <span class="truncate flex-1">{{ category.name }}</span>
                                        <span :class="[
                                            'text-xs font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0',
                                            activeCategory?.uuid === category.uuid
                                                ? 'bg-white/20 text-white'
                                                : 'bg-gray-100 text-gray-500',
                                        ]">{{ category.products.length }}</span>
                                    </button>
                                </li>
                            </ul>
                        </aside>

                        <!-- Right: filtered product grid -->
                        <div class="flex-1 min-w-0">
                            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4" data-aos="fade-up">
                                <ProductCard
                                    v-for="product in filteredProducts"
                                    :key="product.uuid"
                                    :product="product" />
                            </div>
                        </div>
                    </div>
                </ClientOnly>
            </div>
        </div>

        <!-- Why Choose Us -->
        <HomeWhyChooseUs />
    </div>
</template>

<script setup lang="ts">
    const siteUrl = useRuntimeConfig().public.siteUrl as string;

    const { carouselSlides } = useCarousel();
    const { featuredProducts } = useFeaturedProducts();
    const { brands } = useBrands();
    const { popularCategories } = await usePopularCategories();
    const { categoriesWithProducts } = await useCategoriesWithLatestProducts(popularCategories);

    const activeCategory = ref<null | (typeof categoriesWithProducts.value)[0]>(categoriesWithProducts.value?.[0] ?? null);

    const filteredProducts = computed(() => {
        if (activeCategory.value === null) {
            return (categoriesWithProducts.value ?? []).flatMap(c => c.products);
        }
        return activeCategory.value.products ?? [];
    });

    useHead({ link: [{ rel: 'canonical', href: siteUrl }] });

    // Dynamic description using actual category names
    const seoDescription = computed(() => {
        const catNames = (categoriesWithProducts.value ?? []).map(c => c.name);
        const productNames = (featuredProducts.value ?? []).slice(0, 3).map(p => p.name);
        if (catNames.length && productNames.length) {
            return `IT Solution Digital – Cambodia's #1 IT shop in Phnom Penh. Buy ${catNames.join(', ')} & more. Featured: ${productNames.join(', ')}. Genuine warranty, best prices & Khmer expert support. ហាងបច្ចេកវទ្យា​លេខ​មួយ​នៅ​កម្ពុជា.`;
        }
        if (catNames.length) {
            return `IT Solution Digital – Cambodia's #1 IT shop in Phnom Penh. Buy ${catNames.join(', ')}, computers, phones, monitors & printers. Genuine warranty & expert support. ហាងបច្ចេកវទ្យា​នៅ​ភ្នំពេញ.`;
        }
        return 'IT Solution Digital – Cambodia\'s #1 IT shop in Phnom Penh. Buy computers, laptops, phones, monitors, desktop PCs & printers. Genuine warranty, best prices & Khmer expert support. ហាងបច្ចេកវទ្យា​លេខ​មួយ​នៅ​កម្ពុជា.';
    });

    // Dynamic keywords from real product names, brand names, and category names
    const seoKeywords = computed(() => {
        const base = [
            // English – core product keywords
            'computer shop Cambodia', 'laptop shop Phnom Penh', 'phone shop Cambodia',
            'monitor shop Cambodia', 'printer Cambodia', 'desktop computer Cambodia',
            'IT products Cambodia', 'IT solution digital', 'buy laptop Cambodia',
            'computer accessories Phnom Penh', 'IT hardware Cambodia',
            'gaming PC Cambodia', 'MacBook Cambodia', 'tablet Cambodia',
            'computer repair Phnom Penh', 'IT support Cambodia',
            // Khmer keywords
            'ហាងលក់កុំព្យូទ័រ', 'ហាងលក់ទូរស័ព្ទ', 'ហាងព្រីនទ័រ',
            'ហាងបច្ចេកវទ្យា', 'IT Solution ភ្នំពេញ', 'ហាង IT កម្ពុជា',
            'ទិញកុំព្យូទ័រ​កម្ពុជា', 'ហាងលក់​Monitor', 'ជួសជុលកុំព្យូទ័រ',
        ];
        const catNames = (categoriesWithProducts.value ?? []).map(c => c.name);
        const featuredNames = (featuredProducts.value ?? []).slice(0, 6).map(p => p.name);
        const brandNames = [...new Set((featuredProducts.value ?? []).map(p => p.brand?.name).filter(Boolean))];
        return [...base, ...catNames, ...featuredNames, ...brandNames].filter(Boolean).join(', ');
    });

    useSeoMeta({
        title: 'IT Solution Digital | #1 IT Shop in Cambodia – Computers, Phones, Monitors & Printers in Phnom Penh',
        description: seoDescription,
        ogTitle: 'IT Solution Digital – Buy Computers, Phones, Monitors & Printers in Phnom Penh',
        ogDescription: seoDescription,
        ogImage: `${siteUrl}/logo.jpg`,
        ogUrl: siteUrl,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        twitterTitle: 'IT Solution Digital | #1 IT Shop in Cambodia',
        twitterDescription: seoDescription,
        keywords: seoKeywords,
    });

    useHead({
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': [
                        {
                            '@type': 'Organization',
                            '@id': `${siteUrl}/#organization`,
                            name: 'IT Solution Digital',
                            url: siteUrl,
                            logo: `${siteUrl}/logo.jpg`,
                            email: 'sales@itsolutiondigital.com',
                            telephone: ['+855998688883', '+855178688883', '+855708688883'],
                            sameAs: [
                                'https://t.me/hengitsolution',
                            ],
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'St. Commercial, Chipmong Landmark',
                                addressLocality: 'Sangkat Chak Angrae Leu, Khan Meanchey',
                                addressRegion: 'Phnom Penh',
                                postalCode: '120601',
                                addressCountry: 'KH',
                            },
                        },
                        {
                            '@type': 'LocalBusiness',
                            '@id': `${siteUrl}/#localbusiness`,
                            name: 'IT Solution Digital',
                            image: `${siteUrl}/logo.jpg`,
                            url: siteUrl,
                            telephone: '+855998688883',
                            email: 'sales@itsolutiondigital.com',
                            priceRange: '$$',
                            openingHoursSpecification: [
                                {
                                    '@type': 'OpeningHoursSpecification',
                                    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                                    opens: '08:00',
                                    closes: '17:30',
                                },
                            ],
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'St. Commercial, Chipmong Landmark',
                                addressLocality: 'Sangkat Chak Angrae Leu, Khan Meanchey',
                                addressRegion: 'Phnom Penh',
                                postalCode: '120601',
                                addressCountry: 'KH',
                            },
                            geo: {
                                '@type': 'GeoCoordinates',
                                latitude: 11.520857,
                                longitude: 104.9234743,
                            },
                            serviceArea: {
                                '@type': 'GeoCircle',
                                geoMidpoint: {
                                    '@type': 'GeoCoordinates',
                                    latitude: 11.5564,
                                    longitude: 104.9282,
                                },
                                geoRadius: '100000',
                            },
                            hasOfferCatalog: {
                                '@type': 'OfferCatalog',
                                name: 'IT Products & Solutions Cambodia',
                                itemListElement: [
                                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Laptop & Computer' } },
                                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Smartphone & Mobile Phone' } },
                                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Monitor & Display' } },
                                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Desktop PC' } },
                                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Printer & Scanner' } },
                                    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'IT Accessories & Networking' } },
                                ],
                            },
                        },
                        {
                            '@type': 'WebSite',
                            '@id': `${siteUrl}/#website`,
                            url: siteUrl,
                            name: 'IT Solution Digital',
                            publisher: { '@id': `${siteUrl}/#organization` },
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: `${siteUrl}/?q={search_term_string}`,
                                },
                                'query-input': 'required name=search_term_string',
                            },
                        },
                        {
                            '@type': 'FAQPage',
                            mainEntity: [
                                {
                                    '@type': 'Question',
                                    name: 'Where is IT Solution Digital located?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'IT Solution Digital is located at St. Commercial, Chipmong Landmark, Sangkat Chak Angrae Leu, Khan Meanchey, Phnom Penh, Cambodia. Contact us at +855 99 868 888 3.',
                                    },
                                },
                                {
                                    '@type': 'Question',
                                    name: 'What IT products does IT Solution Digital sell?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'IT Solution Digital sells computers, laptops, smartphones, monitors, desktop PCs, printers, scanners, tablets, networking equipment, and IT accessories from top brands in Cambodia.',
                                    },
                                },
                                {
                                    '@type': 'Question',
                                    name: 'Does IT Solution Digital deliver nationwide in Cambodia?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'Yes. IT Solution Digital offers same-day delivery in Phnom Penh and nationwide shipping to all provinces across Cambodia.',
                                    },
                                },
                                {
                                    '@type': 'Question',
                                    name: 'What are IT Solution Digital opening hours?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'IT Solution Digital is open Monday to Saturday from 08:00 to 17:30.',
                                    },
                                },
                                {
                                    '@type': 'Question',
                                    name: 'Does IT Solution Digital sell genuine products with warranty?',
                                    acceptedAnswer: {
                                        '@type': 'Answer',
                                        text: 'Yes. All products sold at IT Solution Digital are 100% genuine with full manufacturer warranty. We stock HP, Dell, Lenovo, Apple, Samsung, and other top brands.',
                                    },
                                },
                            ],
                        },
                    ],
                }),
            },
        ],
    });

    // ItemList JSON-LD for featured products and categories
    useHead({
        script: computed(() => {
            const scripts = [];

            // Featured products ItemList
            const products = featuredProducts.value ?? [];
            if (products.length) {
                scripts.push({
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: 'Featured Products',
                        itemListElement: products.map((p, i) => ({
                            '@type': 'ListItem',
                            position: i + 1,
                            name: p.name,
                            url: `${siteUrl}/products/${p.slug}`,
                            image: p.image,
                            description: p.short_description || '',
                        })),
                    }),
                });
            }

            // Categories ItemList
            const cats = categoriesWithProducts.value ?? [];
            if (cats.length) {
                scripts.push({
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: 'Product Categories',
                        itemListElement: cats.map((c, i) => ({
                            '@type': 'ListItem',
                            position: i + 1,
                            name: c.name,
                            url: `${siteUrl}/categories/${c.slug}`,
                            image: c.image,
                        })),
                    }),
                });
            }

            return scripts;
        }),
    });
</script>