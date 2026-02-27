interface PaymentStatusEvent {
	payment_uuid: string;
	status: string;
	paid_at: string | null;
}

interface UsePaymentChannelOptions {
	paymentUuid: string;
	onStatusUpdate: (event: PaymentStatusEvent) => void;
	onError?: () => void;
}

export const usePaymentChannel = (options: UsePaymentChannelOptions) => {
	const echo = useEcho();
	const isConnected = ref(false);
	const connectionFailed = ref(false);

	let channel: any = null;
	let unsubscribeConnection: (() => void) | null = null;
	let errorFired = false;

	function fireError() {
		if (errorFired) return;
		errorFired = true;
		isConnected.value = false;
		connectionFailed.value = true;
		options.onError?.();
	}

	function connect() {
		if (!options.paymentUuid || !echo) {
			fireError();
			return;
		}

		try {
			channel = echo.private(`payment.${options.paymentUuid}`);

			channel.listen('.payment.status.updated', (event: PaymentStatusEvent) => {
				options.onStatusUpdate(event);
			});

			channel.subscribed(() => {
				isConnected.value = true;
				connectionFailed.value = false;
				errorFired = false;
			});

			channel.error(() => {
				fireError();
			});

			// Monitor transport-level connection state via Echo's connector API.
			// channel.error() only fires for subscription errors (e.g. auth failure),
			// NOT for WebSocket transport failures. When Pusher can't connect for ~10s,
			// it enters "unavailable" state which Echo maps to "failed".
			unsubscribeConnection = echo.connector.onConnectionChange(
				(status: string) => {
					if (status === 'failed') {
						fireError();
					} else if (status === 'connected') {
						isConnected.value = true;
						connectionFailed.value = false;
						errorFired = false;
					}
				},
			);

			// Check current status immediately — Pusher may have already entered
			// "unavailable" state before this composable mounted.
			if (echo.connector.connectionStatus() === 'failed') {
				fireError();
			}
		} catch {
			fireError();
		}
	}

	function disconnect() {
		if (unsubscribeConnection) {
			unsubscribeConnection();
			unsubscribeConnection = null;
		}
		if (channel && options.paymentUuid) {
			echo.leave(`payment.${options.paymentUuid}`);
			channel = null;
		}
		isConnected.value = false;
	}

	onMounted(() => {
		connect();
	});

	onUnmounted(() => {
		disconnect();
	});

	return {
		isConnected,
		connectionFailed,
		disconnect,
	};
};
