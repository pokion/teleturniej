<template>
	<div class="grid grid-cols-5 gap-4 my-6">
		<div class="col-start-1 col-span-1 row-span-2">
			<AspectRatio :ratio="1 / 1">
				<img src="https://www.borbis.pl/wp-content/uploads/mem-sanda%C5%82y.jpg" />
			</AspectRatio>
		</div>
		<div class="col-start-2 col-span-3">
			<p class="text-center">How many items can you fit in your ass?</p>
		</div>
		<div class="col-start-2 col-span-3">
			<div class="grid grid-cols-2">
				<div class="col-span-1 text-center">One</div>
				<div class="col-span-1 text-center">Two</div>
				<div class="col-span-1 text-center">Three</div>
				<div class="col-span-1 text-center">Four</div>
			</div>
		</div>
		<div class="row-start-1 col-start-5 col-span-1 row-span-2 flex">
			<div class="self-center">
				<Button variant="outline" size="icon" class="mb-2.5">
					<Icon name="icon-park-outline:up-one" class="text-2xl" />
				</Button>
				<br />
				<Button variant="outline" size="icon" class="mt-2.5">  
					<Icon name="icon-park-outline:down-one" class="text-2xl" />
				</Button>
			</div>
		</div>
	</div>
</template>