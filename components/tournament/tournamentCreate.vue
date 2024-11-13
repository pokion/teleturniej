<script setup lang="ts">
	const emit = defineEmits(['tournamentChange'])
	let { data } = await useFetch('/api/tournament')
	let dataSend = ref({
		name: ''
	})
	let dataLoading = ref(false);

	async function handleAddTournament(){
		dataLoading.value = true;
		const res = await $fetch('/api/tournament', {
			method: 'POST',
			body: dataSend.value
		});
		refreshData();
		dataSend.value.name = ''
	}

	async function refreshData(){
		data = await $fetch('/api/tournament');
		dataLoading.value = false;
	}

	function tournamentSelected(value: string){
		emit('tournamentChange', value)
	}
</script>

<template>
	<Card>
		<UtilsSpinner v-show="dataLoading" />
		<CardHeader>
			<CardTitle class="flex justify-between">
				Tournament
				<Button variant="outline" size="icon">
					<Icon name="icon-park-outline:refresh" />
				</Button>
			</CardTitle>
			<CardDescription>Select a tournament or create new</CardDescription>
		</CardHeader>
		<CardContent>

			<Select class="w-full" @update:modelValue="tournamentSelected">
				<SelectTrigger >
					<SelectValue placeholder="Select a tournament" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem v-for="tournament in data.rows" :value="tournament.ID.toString()">
							{{tournament.Name}}
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<Separator class="my-4" label="Or" />

			<div class="flex items-center gap-1.5">
				<Input v-model="dataSend.name" id="createTournament" class="flex-grow" type="text" placeholder="Name" />
				<Button @click="handleAddTournament" type="submit" class="flex-none">Create</Button>
			</div>
		</CardContent>
	</Card>
</template>