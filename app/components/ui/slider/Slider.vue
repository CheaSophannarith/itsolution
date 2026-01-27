<script setup lang="ts">
import type { SliderRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SliderRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<{
  'update:modelValue': [value: number[]]
}>()

const modelValue = defineModel<number[]>({ default: () => [0] })
</script>

<template>
  <SliderRoot
    v-model="modelValue"
    :class="cn('relative flex w-full touch-none select-none items-center', props.class)"
    v-bind="{ ...props, class: undefined }"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <SliderTrack class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderRange class="absolute h-full bg-pink-500" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, i) in modelValue"
      :key="i"
      class="block h-4 w-4 rounded-full border border-pink-500 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-pink-500 disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
