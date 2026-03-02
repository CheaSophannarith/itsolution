// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	app: {
		head: {
			title: 'IT Solution Digital',
			titleTemplate: '%s | IT Solution Digital',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			htmlAttrs: { lang: 'en' },
			meta: [
				{ name: 'description', content: 'IT Solution Digital – Your trusted IT partner in Phnom Penh, Cambodia. Shop quality IT products and explore custom software solutions.' },
				{ name: 'keywords', content: 'IT solution digital, IT products Cambodia, software development Cambodia, computer hardware Phnom Penh, HEMIS, scholarship management system' },
				{ name: 'author', content: 'IT Solution Digital' },
				{ name: 'robots', content: 'index, follow' },
				{ property: 'og:site_name', content: 'IT Solution Digital' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:image', content: '/logo.jpg' },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:site', content: '@itsolutiondigital' },
			],
			link: [
				{ rel: 'icon', type: 'image/png', href: '/Icon.PNG' },
			],
		},
	},
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.API_BASE_URL,
			reverbAppKey: process.env.REVERB_APP_KEY,
			reverbHost: process.env.REVERB_HOST,
			reverbPort: process.env.REVERB_PORT,
			reverbScheme: process.env.REVERB_SCHEME,
		},
	},
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: ['shadcn-nuxt', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],

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
