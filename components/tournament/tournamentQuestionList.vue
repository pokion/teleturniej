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

			<TournamentContentQuestion />
			<TournamentContentQuestion />
			<TournamentContentQuestion />

		</CardContent>
	</Card>
</template>