<template>
  <div class="flex justify-center h-1/4 z-1 relative">
    <div v-for="user in props.users" class="flex flex-col justify-end items-center px-2">
      <Avatar class="translate-y-5 border-4 border-white">
        <AvatarImage v-if="user.playerObject.Image" :src="`/api/file/${user.playerObject.Image}`" />
        <AvatarImage v-else :src="`/api/file/kotek.jpg`" />
      </Avatar>
      <div class="bg-red-600 w-24 h-20 text-stone-50"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
		users: Player[]
	}>();
</script>
