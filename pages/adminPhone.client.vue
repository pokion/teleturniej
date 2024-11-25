<template>
  <div>
    <div class="flex flex-wrap">
      <Button class="m-1" @click="emitPrevQuestion" >Prev question</Button>
      <Button class="m-1" @click="emitNextQuestion" >Next question</Button>
      <Button class="m-1" @click="emitStartStopQuestion" >Start/Stop question</Button>
      <Button class="m-1" @click="emitResetClick" >ResetPlayers</Button>
      <Button class="m-1" @click="emitStartAction" >Start action</Button>
      <Button @click="refreshData" variant="outline" size="icon">
				<Icon name="icon-park-outline:refresh" />
			</Button>
    </div>
    <div class="flex flex-col m-2">
      <div class="flex" v-for="player in players">
        <p>{{ player.playerObject.Name }} - {{ player.points }} - {{ player.playerID }} - {{ player.password }}</p>
        <Button @click="addPoint(player.playerID)" variant="outline" size="icon" class="mb-2.5">
						<Icon name="icon-park-outline:plus" class="text-2xl" />
				</Button>
      </div>
    </div>
    current player: {{ firstCurrentPlayer }}
  </div>
</template>

<script lang="ts" setup>
  import { io } from 'socket.io-client';
  const socket = io();
  let players = ref([]);
  let firstCurrentPlayer = ref('null');
  
  socket.on('firstClick', onFirstClick);
  socket.on('resetClick', onResetClick);
  socket.on('userToAddAdmin', onUserToAddAdmin);
  socket.on('refreshAdmin', onRefreshAdmin);

  function onRefreshAdmin(playersActive){
    players.value = playersActive
  }

  function onUserToAddAdmin(body){
    players.value.push(body)
  }

  function onResetClick(){
    firstCurrentPlayer.value = 'null';
  }

  function onFirstClick(id){
    for(let player of players.value){
      if(player.playerID == id){
        firstCurrentPlayer.value = player.playerObject.Name
      }
    }
  }

  function refreshData(){
    socket.emit('refreshAdmin');
  }
  function emitNextQuestion(){
    socket.emit('nextQuestion', 'true');
  }
  function emitStartStopQuestion(){
    socket.emit('clickable')
  }
  function emitResetClick(){
    socket.emit('resetClick')
  }
  function addPoint(id){
    socket.emit('addPoint', id)
  }
  function emitStartAction(){
    socket.emit('startAction')
  }
  function emitPrevQuestion(){
    socket.emit('prevQuestion')
  }
</script>
