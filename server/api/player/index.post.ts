export default defineEventHandler(async (event) => {
	try{
		const body = await readBody(event);
		const db = useDatabase();
		const insertPrepare = db.prepare(`INSERT INTO Player (Name, Image) VALUES (?, ?)`)
		let fileName = null
		if(body.file){
			fileName = await storeFileLocally(body.file, 8, '/questionsFile');
		}

		await insertPrepare.run(body.name, fileName)
		const id = await db.sql`SELECT ID FROM Player WHERE Name = ${body.name}`;
		const TournamentPlayer = await db.sql`INSERT INTO TournamentPlayer (PlayerID, TournamentID)
														  VALUES (${id.rows[0].ID}, ${body.tournamentID})`;
		return id.rows
	}catch(error){
		console.error(error);
    return error
	}
})