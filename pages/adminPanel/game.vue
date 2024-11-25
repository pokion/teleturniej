<template>
  <div>
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
      <Button @click="setTournament" >
        Set a tournament
      </Button>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
		layout: 'panel'
	});
	let { data } = await useFetch('/api/tournament');
  const select = ref()
  async function setTournament(){
    await useFetch('/api/tournament/changeTournamentGame',{
			method: 'POST',
			body: {
        tournamentID: select.value
      }
		});
  }
  function tournamentSelected(val: string){
    select.value = val
  }
</script>