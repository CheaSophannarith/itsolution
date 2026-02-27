import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
	interface Window {
		Pusher: typeof Pusher;
	}
}

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();
	const authStore = useAuthStore();

	window.Pusher = Pusher;

	const echo = new Echo({
		broadcaster: 'reverb',
		key: config.public.reverbAppKey,
		wsHost: config.public.reverbHost,
		wsPort: Number(config.public.reverbPort),
		wssPort: Number(config.public.reverbPort),
		forceTLS: (config.public.reverbScheme ?? 'http') === 'https',
		enabledTransports: ['ws', 'wss'],
		authorizer: (channel: { name: string }) => {
			return {
				authorize: (socketId: string, callback) => {
					fetch(`${config.public.apiBaseUrl}/api/broadcasting/auth`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
							Authorization: `Bearer ${authStore.token}`,
						},
						body: JSON.stringify({
							socket_id: socketId,
							channel_name: channel.name,
						}),
					})
						.then((response) => {
							if (!response.ok) {
								throw new Error('Broadcasting auth failed');
							}
							return response.json();
						})
						.then((data) => callback(null, data))
						.catch((error: unknown) =>
							callback(
								error instanceof Error ? error : new Error(String(error)),
								null,
							),
						);
				},
			};
		},
	});

	return {
		provide: {
			echo,
		},
	};
});
