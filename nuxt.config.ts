// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
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
