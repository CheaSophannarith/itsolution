// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	app: {
		head: {
			title: 'IT Solution Digital',
			titleTemplate: '%s | IT Solution Digital',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			htmlAttrs: { lang: 'km' },
			meta: [
				{ name: 'description', content: 'IT Solution Digital - Cambodia #1 IT shop in Phnom Penh. Buy computers, laptops, phones, monitors, desktop PCs and printers at the best prices. Genuine warranty and expert support.' },
				{ name: 'keywords', content: 'IT solution digital, computer shop Cambodia, laptop Phnom Penh, phone shop Cambodia, monitor Cambodia, printer Cambodia, desktop computer Cambodia, IT products Phnom Penh, computer repair Cambodia, IT accessories Cambodia, gaming PC Cambodia, MacBook Cambodia, HP laptop Cambodia, Dell Cambodia, Lenovo Cambodia' },
				{ name: 'author', content: 'IT Solution Digital' },
				{ name: 'robots', content: 'index, follow' },
				{ name: 'geo.region', content: 'KH-12' },
				{ name: 'geo.placename', content: 'Phnom Penh, Cambodia' },
				{ name: 'geo.position', content: '11.520857;104.9234743' },
				{ name: 'ICBM', content: '11.520857, 104.9234743' },
				{ property: 'og:site_name', content: 'IT Solution Digital' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:image', content: `${process.env.SITE_URL}/logo.jpg` },
				{ property: 'og:locale', content: 'km_KH' },
				{ property: 'og:locale:alternate', content: 'en_US' },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:site', content: '@itsolutiondigital' },
			],
			link: [
				{ rel: 'icon', type: 'image/png', href: '/Icon.PNG' },
				{ rel: 'canonical', href: process.env.SITE_URL},
			],
		},
	},
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.API_BASE_URL,
			siteUrl: process.env.SITE_URL,
			telegramUrl: process.env.TELEGRAM_URL,
			reverbAppKey: process.env.REVERB_APP_KEY,
			reverbHost: process.env.REVERB_HOST,
			reverbPort: process.env.REVERB_PORT,
			reverbScheme: process.env.REVERB_SCHEME,
		},
	},
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['shadcn-nuxt', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/image'],

	image: {
		domains: ['tanxlm-api.test'],
		format: ['webp'],
	},

	css: ['~/assets/css/tailwind.css'],

	vite: {
		plugins: [tailwindcss()],
	},

	shadcn: {
		/**
		 * Prefix for all the imported component.
		 * @default "Ui"
		 */
		prefix: '',
		/**
		 * Directory that the component lives in.
		 * @default "@/components/ui"
		 */
		componentDir: '@/components/ui',
	},
});
