export default async function(questionId: string, tournamentId: string): Promise<null | void>{
	try{
		const db = useDatabase();
        await db.sql`INSERT INTO TournamentQuestion (QuestionID, TournamentID) 
                    VALUES (${questionId},${tournamentId})`;
	}catch(err){
		console.error(err)
		return null
	}
}
