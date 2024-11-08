<template>
	<Card>
		<CardHeader>
			<CardTitle>
				Question
			</CardTitle>
			<CardDescription>Create a question</CardDescription>
		</CardHeader>
		<CardContent>

			<Select>
				<SelectTrigger >
					<SelectValue placeholder="Select a type" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="1">
							Question and answers
						</SelectItem>
						<SelectItem value="2">
							Pixelated image over time
						</SelectItem>
						<SelectItem value="3">
							Guess the music
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<div class="grid grid-cols-2 gap-1.5 pt-5">
				<div class="col-start-1 col-span-2">
					<Label for="questionTitle">Title<span class="text-red-500">*</span></Label>
					<Input id="questionTitle" type="text" placeholder="Title" />
				</div>
				<div class="col-start-1 col-span-1">
					<Label for="anwser1">Anwser<span class="text-red-500">*</span></Label>
					<Input id="anwser1" type="text" placeholder="Anwser" />
				</div>
				<div class="col-start-2 col-span-1">
					<Label for="anwser2">Anwser<span class="text-red-500">*</span></Label>
					<Input id="anwser2" type="text" placeholder="Anwser" />
				</div>
				<div class="col-start-1 col-span-1">
					<Label for="anwser3">Anwser</Label>
					<Input id="anwser3" type="text" placeholder="Anwser" />
				</div>
				<div class="col-start-2 col-span-1">
					<Label for="anwser4">Anwser</Label>
					<Input id="anwser4" type="text" placeholder="Anwser" />
				</div>
				<div class="col-start-1 col-span-2">
					<Label for="multimedia">Multimedia(optional)</Label>
					<Input id="multimedia" type="file" placeholder="Select Multimedia" />
				</div>
			</div>
		</CardContent>
		<CardFooter class="flex">
			<Button type="submit" class="flex-none" variant="ghost">Cancel</Button>
			<div class="flex-grow"></div>
			<Button type="submit" class="flex-none">Create</Button>
		</CardFooter>
	</Card>
</template>