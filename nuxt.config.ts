// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.API_BASE_URL,
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
