<template>
	<Card>
		<CardHeader>
			<CardTitle  class="flex justify-between">
				Tournament
				<Button variant="outline" size="icon">
					<Icon name="icon-park-outline:refresh" />
				</Button>
			</CardTitle>
			<CardDescription>Select a tournament or create new</CardDescription>
		</CardHeader>
		<CardContent>

			<Select class="w-full">
				<SelectTrigger >
					<SelectValue placeholder="Select a tournament" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="1">
							Orange
						</SelectItem>
						<SelectItem value="2">
							Carrot
						</SelectItem>
						<SelectItem value="3">
							ApplePIE
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<Separator class="my-4" label="Or" />

			<div class="flex items-center gap-1.5">
				<Input id="createTournament" class="flex-grow" type="text" placeholder="Name" />
				<Button type="submit" class="flex-none">Create</Button>
			</div>
		</CardContent>
	</Card>
</template>