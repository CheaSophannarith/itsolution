import type Echo from 'laravel-echo';

export const useEcho = (): Echo<'reverb'> => {
	const nuxtApp = useNuxtApp();
	return nuxtApp.$echo as Echo<'reverb'>;
};
