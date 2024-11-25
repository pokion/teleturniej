<template>
  <div class="h-3/4 flex flex-col">
    <div class="gradientMilionerzy absolute h-screen w-screen -z-10 bg-gradient-to-r from-violet-600 to-indigo-600"></div>
      <div class="h-4/6 flex justify-center p-5 z-1 relative">
        <img v-show="props.question.type == 'Question and answers'" v-if="props.question.fileName" :src="`/api/file/${props.question.fileName}`"/>
        <img v-show="props.question.type == 'Pixelated image over time'" class="transition duration-1000" :class="blur" v-if="props.question.fileName" :src="`/api/file/${props.question.fileName}`"/>
				<Icon name="icon-park-outline:fail-picture" class="w-full h-full" v-else />
        <p v-show="props.question.type == 'Guess the music'">MUZYKA?</p>
      </div>
      <div class="h-1/6 flex flex-col justify-center z-1 relative">
        <p class="text-center w-5/6 m-auto p-2 bg-sky-600 rounded-3xl border-2 border-yellow-500 shadow-inner connectLine text-2xl">{{ props.question.title }}</p>
      </div>
      <div class="h-1/6 grid grid-cols-2 gap-y-4 z-1 relative">
        <div class="flex flex-col justify-center relative"><p class="text-center w-2/3 m-auto p-2 bg-sky-600 rounded-3xl border-2 border-yellow-500 shadow-inner connectLine text-2xl">{{ props.question.answers[0]?.title }}</p></div>
        <div class="flex flex-col justify-center relative"><p class="text-center w-2/3 m-auto p-2 bg-sky-600 rounded-3xl border-2 border-yellow-500 shadow-inner connectLine text-2xl">{{ props.question.answers[1]?.title }}</p></div>
        <div class="flex flex-col justify-center relative"><p class="text-center w-2/3 m-auto p-2 bg-sky-600 rounded-3xl border-2 border-yellow-500 shadow-inner connectLine text-2xl">{{ props.question.answers[2]?.title }}</p></div>
        <div class="flex flex-col justify-center relative"><p class="text-center w-2/3 m-auto p-2 bg-sky-600 rounded-3xl border-2 border-yellow-500 shadow-inner connectLine text-2xl">{{ props.question.answers[3]?.title }}</p></div>
      </div>
      
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    question: Question
  }>()
  let blur = ref('blur-3xl');
  watch(() => props.question, (newVal)=>{
    blur.value = 'blur-3xl';
    if(newVal.type == 'Guess the music'){
      audio = new Audio('/api/file/'+ newVal.fileName);
      audio.volume = 0.5
    }
  })
  let intervalID = null;
  let audio = null;
  let playAble = false;
  let blurEntry = ['blur-none', 'blur-sm', 'blur', 'blur-md', 'blur-lg', 'blur-xl', 'blur-2xl', 'blur-3xl'];
  function actionGame(){
    if(props.question.type == 'Pixelated image over time' && intervalID == null){
      intervalID = setInterval(()=>{
        let indexArr = blurEntry.indexOf(blur.value);
        if(indexArr == 0){
          clearInterval(intervalID);
        }
        blur.value = blurEntry[indexArr - 1]
      }, 1000)
    }else if(props.question.type == 'Pixelated image over time' && intervalID != null){
      clearInterval(intervalID);
      intervalID = null;
    }
    if(props.question.type == 'Guess the music'){
      console.log("asdasd")
      if(!playAble){
        //audio.play()
        console.log("asdasd true",audio.volume)
        playAble = true
      }
      if(playAble){
        audio.pause()
        playAble = false
      }
    }
  }
  defineExpose({actionGame})
</script>
