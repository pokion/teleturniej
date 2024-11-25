<template>
  <div @click="onClick" class="w-screen h-screen p-4" :class="{'bg-zinc-400': !isClickable, 'bg-cyan-300': isClickable, 'bg-green-500': firstClick}">
    <PlayerRegister @user-recconect="onRecconect" @user-created="onUserCreate" :tournament-i-d="tournamentID.ID" v-if="register == false" />
  </div>
</template>

<script lang="ts" setup>
  import { io } from 'socket.io-client';
  const socket = io();
  const { data: tournamentID } = await useFetch('/api/tournament/getCurrentTournament');
  let register = ref(false);
  let isClickable = ref(false);
  let firstClick = ref(false);

  socket.on('clickable', onClickable);
  socket.on('firstClick', onFirstClick);
  socket.on('resetClick', onResetClick);
  socket.on('RecconectSuccess', onRecconectSuccess);

  function onClick(){
    if(isClickable.value && register.value){
      socket.emit('click', register.value)
    }
  }

  function onResetClick(){
    firstClick.value = false;
    isClickable.value = false;
  }

  function onFirstClick(id){
    if(id == register.value){
      firstClick.value = true;
    }else{
      isClickable.value = false;
    }
  }

  function onRecconect(pin){
    socket.emit('userReconnect', pin)
  }

  function onClickable(){
    isClickable.value = !isClickable.value
  }
  
  function onUserCreate(userID){
    register.value = userID;
    socket.emit('userCreated', userID);
  }

  function onRecconectSuccess(userID){
    if(register.value == false){
      register.value = userID;
    }
  }
</script>
