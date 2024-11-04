export default defineEventHandler(async (event) => {
	try{
		const {title, type, multimediaPath, tournamentID} = await readBody(event);
		const db = useDatabase();
		const id = uid();
		const result = await db.sql`INSERT INTO Question (ID, Title, Type, MultideiaPath) 
												VALUES (${id},${title},${type},${multimediaPath})`;
		let resultTournamentQuestion;
		if(result.success){
			resultTournamentQuestion = await db.sql`INSERT INTO QuestionAnswer (QuestionID, TournamentID) 
															VALUES (${id}, ${tournamentID})`;
		}else{
			return result;
		}

		return resultTournamentQuestion
	}catch(error){
		console.error(error);
    	return error
	}
})