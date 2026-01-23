<template>
    <div class="mt-4 sm:mt-6">
        <button @click="toggleSection"
            class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2">
            {{ label }}
            <ChevronDown :class="['w-5 h-5 transition-transform lg:hidden', expanded ? 'rotate-180' : '']" />
        </button>
        <div :class="['space-y-1 sm:space-y-2', { 'hidden lg:block': !expanded }]">
            <label v-for="item in items" :key="item.id"
                class="flex items-center gap-1 cursor-pointer hover:bg-gray-50 rounded p-1">
                <input type="checkbox" :value="item.id" v-model="localValue"
                    class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                <span class="text-sm text-gray-700">{{ item.name }}</span>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronDown } from 'lucide-vue-next';

    interface Item {
        id: number;
        name: string;
    }

    const props = defineProps<{
        label: string;
        items: Item[];
        expanded: boolean;
    }>();

    const emit = defineEmits(['toggle']);

    const localValue = defineModel<number[]>();

    const toggleSection = () => {
        emit('toggle');
    };

    // No need for watch or manual emit for v-model when using defineModel
</script>
