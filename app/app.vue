<template>
	<NuxtLayout>
		<NuxtPage :transition="{
			name: 'page',
			mode: 'out-in'
		}" />
	</NuxtLayout>
</template>

<style>
/* Page transition styles */
.page-enter-active,
.page-leave-active {
	transition: all 0.3s ease;
}

.page-enter-from {
	opacity: 0;
	transform: translateY(20px);
}

.page-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}

/* Alternative fade transition */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

/* Slide transition */
.slide-left-enter-active,
.slide-left-leave-active {
	transition: all 0.3s ease;
}

.slide-left-enter-from {
	opacity: 0;
	transform: translateX(30px);
}

.slide-left-leave-to {
	opacity: 0;
	transform: translateX(-30px);
}

/* Slide right transition */
.slide-right-enter-active,
.slide-right-leave-active {
	transition: all 0.3s ease;
}

.slide-right-enter-from {
	opacity: 0;
	transform: translateX(-30px);
}

.slide-right-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* Scale transition */
.scale-enter-active,
.scale-leave-active {
	transition: all 0.3s ease;
}

.scale-enter-from {
	opacity: 0;
	transform: scale(0.95);
}

.scale-leave-to {
	opacity: 0;
	transform: scale(1.05);
}
</style>