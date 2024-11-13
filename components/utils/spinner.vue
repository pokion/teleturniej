<script setup lang="ts">
	const props = defineProps<{
		message?: string
	}>()
</script>
<template>
	<div v-if="props.message" class="absolute flex justify-center w-full h-full bg-neutral-200/50 z-50">
		<p class="m-auto">{{props.message}}</p>
	</div>
	<div v-else class="absolute flex justify-center w-full h-full bg-neutral-200/50 z-50">
		<Icon name="icon-park-outline:loading-one" class="animate-spin m-auto" />
	</div>
</template>