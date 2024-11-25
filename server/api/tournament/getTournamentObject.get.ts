export default defineEventHandler(async (event) => {
  try{
		const db = useDatabase();
		const selectTournament = await db.prepare('SELECT * FROM Tournament WHERE Active = true').get();
		return await getQuestions(selectTournament.ID)
	}catch(error){
		console.error(error);
    throw new Error(String(error));
	}
})
