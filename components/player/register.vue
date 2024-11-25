<template>
  <div>
    <Card>
      <CardHeader>
        <CardTitle>Rejestracja</CardTitle>
        <CardDescription>Proszę wypełnić wszystko a potem kliknąć start</CardDescription>
      </CardHeader>
      <CardContent v-if="connect">
        <div class="flex flex-col m-4">
          <Input v-model="name" type="text" placeholder="Imię" />
          <br />
          <Input @input="handleFileInput" id="multimedia" type="file" placeholder="Dodaj zdjęcie" />
        </div>
      </CardContent>
      <CardContent v-else>
        <div class="flex flex-col m-4">
          <PinInput
            id="pin"
            placeholder="○"
            v-model="pinValue"
            @complete="onPinComplete"
          >
            <PinInputGroup>
              <PinInputInput 
                v-for="(id, index) in 4"
                :key="id"
                :index="index"
              />
            </PinInputGroup>
          </PinInput>
        </div>
      </CardContent>
      <CardFooter>
        <Button @click="onStart">Start</Button>
        <Separator class="mx-4" orientation="vertical" label="Or"  />
        <Button @click="onReconnectButton">Reconnect</Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  const connect = ref(true);
  const pinValue = ref<string[]>([]);
  const emit = defineEmits(['userCreated', 'userRecconect']);
  const props = defineProps<{
		tournamentID: number | string
	}>();
  let { handleFileInput, files } = useFileStorage();
  let name = ref('');

  function onPinComplete(e){
    emit('userRecconect', e.join(''));
  }

  function onReconnectButton(){
    connect.value = !connect.value
  }

  async function onStart(){
    if(!name.value || name.value.length < 3){
      alert('Musisz wpisać imię');
      return;
    }
    const response = await $fetch('/api/player',{
			method: 'POST',
			body: {
				name: name.value,
        tournamentID: props.tournamentID,
        file: files.value[0]
			}
		})
    if(response && response[0]){
      emit('userCreated', response[0].ID);
    }else{
      alert('Upsi coś się popsuło :(')
    }
  }
</script>
