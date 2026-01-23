<template>
    <div class="mt-4 sm:mt-6">
        <button @click="toggleSection"
            class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2">
            {{ label }}
            <ChevronDown :class="['w-5 h-5 transition-transform lg:hidden', expanded ? 'rotate-180' : '']" />
        </button>
        <div :class="['space-y-1 sm:space-y-2', { 'hidden lg:block': !expanded }]">
            <div v-if="!showAll && items.length > 10">
                <label v-for="item in items.slice(0, 10)" :key="item.id"
                    class="flex items-center gap-1 cursor-pointer hover:bg-gray-50 rounded p-1">
                    <input type="checkbox" :value="item.id" v-model="localValue"
                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                    <span class="text-sm text-gray-700">{{ item.name }}</span>
                </label>
                <button @click="showAll = true"
                    class="text-sm text-pink-500 hover:text-pink-300 font-medium mt-2 flex items-center gap-1">
                    <ChevronDown class="w-4 h-4" />
                    Show more
                </button>
            </div>
            <div v-else-if="showAll && items.length > 10" class="border border-gray-300 rounded-lg p-3 bg-white">
                <div class="max-h-64 overflow-y-auto space-y-2 pr-2">
                    <label v-for="item in items" :key="item.id"
                        class="flex items-center gap-1 cursor-pointer hover:bg-gray-50 rounded p-1">
                        <input type="checkbox" :value="item.id" v-model="localValue"
                            class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                        <span class="text-sm text-gray-700">{{ item.name }}</span>
                    </label>
                </div>
                <button @click="showAll = false"
                    class="text-sm text-pink-500 hover:text-pink-300 font-medium mt-3 flex items-center gap-1 w-full justify-center border-t pt-2">
                    <ChevronUp class="w-4 h-4" />
                    Show less
                </button>
            </div>
            <div v-else>
                <label v-for="item in items" :key="item.id"
                    class="flex items-center gap-1 cursor-pointer hover:bg-gray-50 rounded p-1">
                    <input type="checkbox" :value="item.id" v-model="localValue"
                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                    <span class="text-sm text-gray-700">{{ item.name }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronDown, ChevronUp } from 'lucide-vue-next';
    import { ref } from 'vue';

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
    const showAll = ref(false);

    const toggleSection = () => {
        emit('toggle');
    };

    // No need for watch or manual emit for v-model when using defineModel
</script>
