<script setup lang="ts">
	definePageMeta({
		layout: 'panel'
	})
</script>

<template>
	<div class="grid grid-cols-5 gap-4 p-7">
		<TournamentCreate class="col-start-1 col-span-2" />
		<TournamentQuestionList class="col-start-3 col-span-3 row-span-2" />
		<TournamentCreateQuestion class="col-start-1 col-span-2" />
	</div>
</template>