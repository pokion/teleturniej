<script setup lang="ts">
	const props = defineProps<{
		tournamentID: number | string
	}>()
	const emit = defineEmits(['questionCreate'])
	let { data } = await useFetch('/api/question/questionType')
	const spinnerMessage = "You need to select tournament";
	let dataSend = ref({
		type: 0,
		title: '',
		answers: [
			{title: '', isCorrect: false},
			{title: '', isCorrect: false},
			{title: '', isCorrect: false},
			{title: '', isCorrect: false}
		]
	})
	let { handleFileInput, files } = useFileStorage();

	function handleSelect(select: string){
		dataSend.value.type = Number(select);
	}

	async function handleSubmit(){
		const response = await $fetch('/api/question',{
			method: 'POST',
			body: {
				...dataSend.value,
				file: files.value[0],
				tournamentID: props.tournamentID
			}
		})
		emit('questionCreate');
		clearForm();
	}

	function clearForm(){
		dataSend.value = {
			type: dataSend.value.type,
			title: '',
			answers: [
				{title: '', isCorrect: false},
				{title: '', isCorrect: false},
				{title: '', isCorrect: false},
				{title: '', isCorrect: false}
			]
		}
	}
</script>
<template>
	<Card>
		<UtilsSpinner v-show="props.tournamentID != 0 ? false : true" :message="spinnerMessage" />
		<CardHeader>
			<CardTitle>
				Question
			</CardTitle>
			<CardDescription>Create a question</CardDescription>
		</CardHeader>
		<CardContent>

			<Select @update:modelValue="handleSelect">
				<SelectTrigger >
					<SelectValue placeholder="Select a type" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem v-for="type in data?.rows" :value="String(type.ID)">
							{{ type.Name }}
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<div class="grid grid-cols-2 gap-1.5 pt-5">
				<div class="col-start-1 col-span-2">
					<Label for="questionTitle">Title<span class="text-red-500">*</span></Label>
					<Input v-model="dataSend.title" id="questionTitle" type="text" placeholder="Title" />
				</div>
				<div class="col-start-1 col-span-1">
					<Label for="anwser1">Anwser <Checkbox v-model:checked="dataSend.answers[0].isCorrect" /> Correct question</Label>
					<Input v-model="dataSend.answers[0].title" id="anwser1" type="text" placeholder="Anwser" />
				</div>
				<div class="col-start-2 col-span-1">
					<Label for="anwser2">Anwser <Checkbox v-model:checked="dataSend.answers[1].isCorrect" /> Correct question</Label>
					<Input v-model="dataSend.answers[1].title" id="anwser2" type="text" placeholder="Anwser" />
				</div>
				<div class="col-start-1 col-span-1">
					<Label for="anwser3">Anwser <Checkbox v-model:checked="dataSend.answers[2].isCorrect" /> Correct question</Label>
					<Input v-model="dataSend.answers[2].title" id="anwser3" type="text" placeholder="Anwser" />
				</div>
				<div class="col-start-2 col-span-1">
					<Label for="anwser4">Anwser <Checkbox v-model:checked="dataSend.answers[3].isCorrect" /> Correct question</Label>
					<Input v-model="dataSend.answers[3].title" id="anwser4" type="text" placeholder="Anwser" />
				</div>
				<div class="col-start-1 col-span-2">
					<Label for="multimedia">Multimedia(optional)</Label>
					<Input @input="handleFileInput" id="multimedia" type="file" placeholder="Select Multimedia" />
				</div>
			</div>
		</CardContent>
		<CardFooter class="flex">
			<Button @click="clearForm" type="submit" class="flex-none" variant="ghost">Cancel</Button>
			<div class="flex-grow"></div>
			<Button @click="handleSubmit" type="submit" class="flex-none">Create</Button>
		</CardFooter>
	</Card>
</template>