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
                    <span class="text-white">Privacy Policy</span>
                </nav>

                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4">
                    Privacy Policy
                </h1>
                <p class="text-white/90 max-w-2xl text-sm sm:text-base">
                    Please read our return, refund, and exchange policies carefully.
                </p>
            </div>
        </div>

        <!-- Main Content Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
            <div class="space-y-8">
                <!-- Return Policy -->
                <section>
                    <h2 class="text-xl sm:text-2xl font-bold text-pink-500 mb-4">Return Policy</h2>
                    <div class="bg-gray-50 rounded-xl p-6 space-y-4 text-gray-600">
                        <p>
                            Our policy lasts <strong class="text-gray-800">30 days</strong>. If 30 days have gone by
                            since your purchase, unfortunately we can't offer you a refund or exchange.
                        </p>
                        <p>
                            To be eligible for a return, your item must be unused and in the same condition that you
                            received it. It must also be in the original packaging.
                        </p>
                        <p>
                            Several types of goods are exempt from being returned. We also do not accept products that
                            are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.
                        </p>
                    </div>
                </section>

                <!-- Non-Returnable Items -->
                <section>
                    <h2 class="text-xl sm:text-2xl font-bold text-pink-500 mb-4">Non-Returnable Items</h2>
                    <div class="bg-gray-50 rounded-xl p-6">
                        <ul class="space-y-2 list-disc list-inside text-gray-600">
                            <li>Gift cards</li>
                            <li>Downloadable software products</li>
                            <li>Intimate or sanitary goods</li>
                            <li>Hazardous materials, flammable liquids or gases</li>
                        </ul>
                        <p class="mt-4 text-gray-600">
                            To complete your return, we require a receipt or proof of purchase. Please do not send your
                            purchase back to the manufacturer.
                        </p>
                    </div>
                </section>

                <!-- Partial Refunds -->
                <section>
                    <h2 class="text-xl sm:text-2xl font-bold text-pink-500 mb-4">Partial Refunds</h2>
                    <div class="bg-gray-50 rounded-xl p-6">
                        <p class="text-gray-600 mb-4">There are certain situations where only partial refunds are
                            granted:</p>
                        <ul class="space-y-2 list-disc list-inside text-gray-600">
                            <li>Any item not in its original condition, is damaged or missing parts for reasons not due
                                to our error.</li>
                            <li>Any item that is returned more than 30 days after delivery.</li>
                        </ul>
                    </div>
                </section>

                <!-- Refunds Process -->
                <section>
                    <h2 class="text-xl sm:text-2xl font-bold text-pink-500 mb-4">Refunds</h2>
                    <div class="bg-gray-50 rounded-xl p-6 space-y-4 text-gray-600">
                        <p>
                            Once your return is received and inspected, we will send you an email to notify you that we
                            have received your returned item. We will also notify you of the approval or rejection of
                            your refund.
                        </p>
                        <p>
                            If you are approved, then your refund will be processed, and a credit will automatically be
                            applied to your credit card or original method of payment, within a certain amount of days.
                        </p>
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                            <p class="text-blue-800 font-medium">
                                <strong>Note:</strong> Only regular priced items may be refunded. Unfortunately, sale
                                items cannot be refunded.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Late or Missing Refunds -->
                <section>
                    <h2 class="text-xl sm:text-2xl font-bold text-pink-500 mb-4">Late or Missing Refunds</h2>
                    <div class="bg-gray-50 rounded-xl p-6">
                        <p class="text-gray-600 mb-4">If you haven't received a refund yet:</p>
                        <ol class="space-y-2 list-decimal list-inside text-gray-600">
                            <li>First check your bank account again.</li>
                            <li>Contact your credit card company - it may take some time before your refund is
                                officially posted.</li>
                            <li>Contact your bank. There is often some processing time before a refund is posted.</li>
                            <li>If you've done all of this and still have not received your refund, please contact us.
                            </li>
                        </ol>
                    </div>
                </section>

                <!-- Exchanges -->
                <section>
                    <h2 class="text-xl sm:text-2xl font-bold text-pink-500 mb-4">Exchanges</h2>
                    <div class="bg-gray-50 rounded-xl p-6 space-y-4 text-gray-600">
                        <p>
                            We only replace items if they are defective or damaged. If you need to exchange it for the
                            same item, send us an email and ship your item to our address.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronRight } from 'lucide-vue-next';

    const siteUrl = useRuntimeConfig().public.siteUrl as string;

    useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/privacy-policy` }] });

    useSeoMeta({
        title: 'Privacy Policy',
        description: 'Read IT Solution Digital\'s privacy policy. Learn how we handle your data, our 30-day return policy for unused items in original packaging, and your rights as a customer.',
        ogTitle: 'Privacy Policy | IT Solution Digital',
        ogDescription: 'IT Solution Digital\'s privacy and return policy. 30-day returns on unused items in original packaging.',
        ogType: 'website',
        ogImage: `${siteUrl}/logo.jpg`,
        keywords: 'IT Solution Digital privacy policy, return policy Cambodia, data privacy IT shop',
    });
</script>
