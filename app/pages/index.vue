<template>
    <div class="min-h-screen">
        <!-- Hero Carousel -->
        <HomeHeroCarousel :slides="carouselSlides" />

        <!-- Featured Products -->
        <HomeFeaturedProducts :products="featuredProducts" />

        <!-- Shop by Brand -->
        <HomeBrandsCarousel :brands="brands" />

        <!-- Category Products Sections -->
        <div v-if="categoriesWithProducts && categoriesWithProducts.length > 0" class="bg-white py-4 sm:py-0">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ClientOnly>
                    <div class="mb-4 sm:mb-6" data-aos="fade-up">
                        <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand">
                            Explore our popular categories
                        </span>
                    </div>

                    <div class="space-y-8 sm:space-y-16">
                        <HomeCategorySection
                            v-for="(category, index) in categoriesWithProducts"
                            :key="category.uuid"
                            :category="category"
                            data-aos="fade-up"
                            :data-aos-delay="index * 100" />
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
        title: '#1 Computer, Phone, Monitor & Printer Shop in Cambodia',
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