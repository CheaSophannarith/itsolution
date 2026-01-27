<template>
    <div class="mt-4 sm:mt-6">
        <button @click="$emit('toggle')"
            class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2">
            Price Range
            <ChevronDown :class="['w-5 h-5 transition-transform lg:hidden', expanded ? 'rotate-180' : '']" />
        </button>
        <div :class="['space-y-4', { 'hidden lg:block': !expanded }]">
            <!-- Current values display -->
            <div class="flex items-center justify-between text-sm font-medium text-gray-700">
                <span>${{ currentMin }}</span>
                <span>${{ currentMax }}</span>
            </div>

            <!-- Range Slider -->
            <Slider v-model="sliderValue" :min="min" :max="max" :step="1" :min-steps-between-thumbs="1" />

            <!-- Manual inputs -->
            <div class="flex items-center gap-2">
                <div class="flex-1">
                    <label class="text-xs text-gray-500 mb-1 block">Min ($)</label>
                    <input type="number" :min="min" :max="max" :placeholder="String(min)" v-model.number="currentMin"
                        class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-brand focus:ring-brand" />
                </div>
                <span class="text-gray-400 mt-5">-</span>
                <div class="flex-1">
                    <label class="text-xs text-gray-500 mb-1 block">Max ($)</label>
                    <input type="number" :min="min" :max="max" :placeholder="String(max)" v-model.number="currentMax"
                        class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-brand focus:ring-brand" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { ChevronDown } from 'lucide-vue-next';
    import { Slider } from '~/components/ui/slider';

    const props = defineProps<{
        min: number;
        max: number;
        expanded: boolean;
    }>();

    defineEmits(['toggle']);

    const localMin = defineModel<number | undefined>('minValue');
    const localMax = defineModel<number | undefined>('maxValue');

    const currentMin = computed({
        get: () => localMin.value ?? props.min,
        set: (v: number) => { localMin.value = v; },
    });

    const currentMax = computed({
        get: () => localMax.value ?? props.max,
        set: (v: number) => { localMax.value = v; },
    });

    const sliderValue = computed({
        get: () => [currentMin.value, currentMax.value],
        set: (v: number[]) => {
            localMin.value = v[0];
            localMax.value = v[1];
        },
    });
</script>
