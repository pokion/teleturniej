<template>
  <div class="w-screen h-screen">
    <TvQuestionsAndAnswers ref="actionsQuestion" :question="currentQuestion" />
    <TvPlayers :users="users" />
  </div>
</template>

<script lang="ts" setup>
  import { io } from 'socket.io-client';
  const socket = io();
  const { data: questions } = await useFetch('/api/tournament/getTournamentObject');
  const users = ref([])
  const actionsQuestion = ref()
  let currentIndex = 0
  let currentQuestion = ref(questions.value[currentIndex])

  socket.on('nextQuestion', nexQuestion)
  socket.on('userToAdd', onUserAdd);
  socket.on('refreshAdmin', onRefreshAdmin);
  socket.on('prevQuestion', onPrevQuestion);
  socket.on('startAction', onStartAction);
  
  function onPrevQuestion(){
    currentIndex = currentIndex - 1;
    if(currentIndex < 0) return;
    currentQuestion.value = questions.value[currentIndex]; 
  }
  function nexQuestion(){
    currentIndex = currentIndex + 1;
    if(currentIndex == questions.value?.length) return;
    currentQuestion.value = questions.value[currentIndex]; 
  }
  function onUserAdd(user){
    users.value.push(user)
  }
  function onRefreshAdmin(usersAdmin){
    users.value = usersAdmin
  }
  function onStartAction(){
    actionsQuestion.value.actionGame();
  }

</script>
