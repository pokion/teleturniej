export default defineEventHandler(async (event) => {
  try{
		const { tournamentID } = await readBody<{
      tournamentID: string
    }>(event);
		const db = useDatabase();
		const selectTournament = await db.prepare('SELECT * FROM Tournament WHERE Active = true').get();
    if(selectTournament){
      await db.prepare('UPDATE Tournament SET Active = true WHERE ID = ?').run(tournamentID)
      await db.prepare('UPDATE Tournament SET Active = false WHERE ID = ?').run(selectTournament.ID)
    }else{
      await db.prepare('UPDATE Tournament SET Active = true WHERE ID = ?').run(tournamentID)
    }
		return true
	}catch(error){
		console.error(error);
    throw new Error(String(error));
	}
})
