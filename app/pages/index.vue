<template>
    <div class="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
        <h1 class="text-3xl font-bold text-foreground">Shadcn-Vue Test</h1>
        <p class="text-muted-foreground">Click the button to test the setup</p>

        <div class="flex gap-4">
            <Button @click="handleClick">
                Click me
            </Button>
            <Button variant="secondary">
                Secondary
            </Button>
            <Button variant="destructive">
                Destructive
            </Button>
            <Button variant="outline">
                Outline
            </Button>
            <Button variant="ghost">
                Ghost
            </Button>
        </div>

        <p v-if="clicked" class="text-brand font-medium mt-4">
            🎉 Button clicked {{ clickCount }} time(s)!
        </p>
    </div>
</template>

<script setup lang="ts">

    import { ref } from 'vue'

    const clicked = ref(false)
    const clickCount = ref(0)

    function handleClick() {
        clicked.value = true
        clickCount.value++
    }
</script>
