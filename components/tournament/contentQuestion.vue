<script lang="ts" setup>
	const props = defineProps<{
		tournamentId?: string;
		imageSrc?: string;
		title: string;
		answers?: Answer[];
	}>();
</script>
<template>
	<div class="grid grid-cols-5 gap-4 my-6 border-2 rounded-2xl">
		<div class="col-start-1 col-span-1 row-span-2">
			<AspectRatio :ratio="1 / 1">
				<img v-if="props.imageSrc" :src="`/api/file/${props.imageSrc}`" />
				<Icon name="icon-park-outline:fail-picture" class="w-full h-full" v-else />
			</AspectRatio>
		</div>
		<div class="col-start-2 col-span-3">
			<p class="text-center">{{  props.title  }}</p>
		</div>
		<div class="col-start-2 col-span-3">
			<div class="grid grid-cols-2">
				<div class="col-span-1 text-center" v-for="answer in props.answers">{{ answer.title }}</div>
			</div>
		</div>
		<div class="row-start-1 col-start-5 col-span-1 row-span-2 flex">
			<div class="self-center grid grid-cols-2 gap-4">
				<div class="cols-start-1 col-span-1">
					<Button variant="outline" size="icon" class="mb-2.5">
						<Icon name="icon-park-outline:up-one" class="text-2xl" />
					</Button>
					<br />
					<Button variant="outline" size="icon" class="mt-2.5">  
						<Icon name="icon-park-outline:down-one" class="text-2xl" />
					</Button>
				</div>
				<div class="col-start-2 col-span-1">
					<Button variant="outline" size="icon" class="mb-2.5">
						<Icon name="icon-park-outline:edit" class="text-2xl" />
					</Button>
					<br />
					<Button variant="destructive" size="icon" class="mt-2.5">  
						<Icon name="icon-park-outline:delete-five" class="text-2xl" />
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>