export default defineEventHandler(async (event) => {
	try{
		const body = await readBody(event);
		const db = useDatabase();
    console.log(body)
		const result = await db.sql`INSERT INTO Player (Name) VALUES (${body.name})`;
		const id = await db.sql`SELECT ID FROM Player WHERE Name = ${body.name}`;
		const TournamentPlayer = await db.sql`INSERT INTO TournamentPlayer (PlayerID, TournamentID)
														  VALUES (${id.rows[0].ID}, ${body.tournamentID})`;
		return id.rows
	}catch(error){
		console.error(error);
    return error
	}
})