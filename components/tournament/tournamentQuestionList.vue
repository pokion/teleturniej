<template>
	<Card>
		<CardHeader>
			<CardTitle class="flex justify-between">
				Tournament questions
				<Button variant="outline" size="icon">
					<Icon name="icon-park-outline:refresh" />
				</Button>
			</CardTitle>
			<CardDescription>Change questions index</CardDescription>
		</CardHeader>
		<CardContent>
			<ScrollArea class="h-[650px]"> 
				<TournamentContentQuestion />
				<TournamentContentQuestion />
			</ScrollArea>

		</CardContent>
	</Card>
</template>