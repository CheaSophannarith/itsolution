<template>
    <Teleport to="body">
        <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
            <TransitionGroup name="toast">
                <div
                    v-for="toast in toasts"
                    :key="toast.id"
                    :class="[
                        'pointer-events-auto rounded-lg shadow-2xl px-4 py-3 min-w-[280px] max-w-md flex items-center gap-3 backdrop-blur-sm border',
                        toast.type === 'success' && 'bg-green-500/95 text-white border-green-600',
                        toast.type === 'error' && 'bg-red-500/95 text-white border-red-600',
                        toast.type === 'info' && 'bg-blue-500/95 text-white border-blue-600',
                    ]"
                >
                    <!-- Icon -->
                    <div class="flex-shrink-0">
                        <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5" />
                        <XCircle v-else-if="toast.type === 'error'" class="w-5 h-5" />
                        <Info v-else class="w-5 h-5" />
                    </div>

                    <!-- Message -->
                    <p class="flex-1 text-sm font-medium">{{ toast.message }}</p>

                    <!-- Close Button -->
                    <button
                        @click="removeToast(toast.id)"
                        class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                    >
                        <X class="w-4 h-4" />
                    </button>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle, XCircle, Info, X } from 'lucide-vue-next';

const { toasts, removeToast } = useToast();
</script>

<style scoped>
.toast-enter-active {
    animation: toast-in 0.3s ease-out;
}

.toast-leave-active {
    animation: toast-out 0.2s ease-in;
}

@keyframes toast-in {
    from {
        opacity: 0;
        transform: translateX(100%) scale(0.8);
    }
    to {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
}

@keyframes toast-out {
    from {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateX(100%) scale(0.8);
    }
}
</style>