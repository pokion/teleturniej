<script setup lang="ts">
	definePageMeta({
		layout: 'panel'
	})
	const questionList = ref();
	let tournamentID = ref('')
	function onTournamentIdChange(id: string){
		tournamentID.value = id
	}
	function onCreateQuestion(){
		questionList.value.handleCHangeTournamentId(tournamentID.value)
	}
</script>

<template>
	<div class="grid grid-cols-5 gap-4 p-7">
		<TournamentCreate class="col-start-1 col-span-2" @tournament-change="onTournamentIdChange" />
		<TournamentQuestionList ref="questionList" :tournamentID="tournamentID" class="col-start-3 col-span-3 row-span-2" />
		<TournamentCreateQuestion @question-create="onCreateQuestion" :tournamentID="tournamentID" class="col-start-1 col-span-2" />
	</div>
</template>