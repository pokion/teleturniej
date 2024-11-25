export default defineEventHandler(async (event) => {
  try{
		const db = useDatabase();
		const selectTournament = await db.prepare('SELECT ID FROM Tournament WHERE Active = true').get();
		return selectTournament;
	}catch(error){
		console.error(error);
    throw new Error(String(error));
	}
})
