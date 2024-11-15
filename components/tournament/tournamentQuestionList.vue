<script lang="ts" setup>
	const props = defineProps<{
		tournamentID: number | string
	}>();
	const spinnerMessage = "You need to select tournament";
	const questionList = ref<Question[]>();
	let spinnerShow = ref(false);

	async function handleCHangeTournamentId(value: string | number){
		spinnerShow.value = true;
		if(Number.isInteger(value)) return;
		questionList.value = await $fetch('/api/question/' + value);
		spinnerShow.value = false;
	}

	async function handleIndexChange(value){
		spinnerShow.value = true;
		await $fetch('/api/question/changeIndex',{
			method: 'POST',
			body: {
				questionID: value.id,
				tournamentID: props.tournamentID,
				newIndex: value.indexVal
			}
		})
		handleCHangeTournamentId(props.tournamentID)
	}

	async function handleDelete(value){
		spinnerShow.value = true;
		await $fetch('/api/question/delete',{
			method: 'POST',
			body: value
		})
		handleCHangeTournamentId(props.tournamentID)
	}

	watch(()=>props.tournamentID, handleCHangeTournamentId)
	
	defineExpose({
		handleCHangeTournamentId
	})
</script>
<template>
	<Card>
		<UtilsSpinner v-show="props.tournamentID != 0 ? false : true" :message="spinnerMessage" />
		<UtilsSpinner v-show="spinnerShow" />
		<CardHeader>
			<CardTitle class="flex justify-between">
				Tournament questions
				<Button @click="handleCHangeTournamentId(props.tournamentID)" variant="outline" size="icon">
					<Icon name="icon-park-outline:refresh" />
				</Button>
			</CardTitle>
			<CardDescription>Change questions index</CardDescription>
		</CardHeader>
		<CardContent>
			<ScrollArea class="h-[650px]"> 
				<TournamentContentQuestion v-for="(question, index) in questionList"
					:tournament-id="question.id"
					:image-src="question.fileName"
					:title="question.title"
					:answers="question.answers"
					:id="question.id"
					:index-number="question.indexNumber"
					:last-item="index == questionList?.length - 1"
					@index-up="handleIndexChange"
					@delete-question="handleDelete"
				/>
			</ScrollArea>

		</CardContent>
	</Card>
</template>