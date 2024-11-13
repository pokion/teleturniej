export default async function(question: Question, tournamentID?: string): Promise<string | null>{
	try{
		const db = useDatabase();
		const questionId = uid();
		let indexNumber = 0;
		if(tournamentID){
			indexNumber = (await db.sql`SELECT COUNT(TournamentID) AS count FROM TournamentQuestion WHERE TournamentID = ${tournamentID}`).rows[0].count + 1;
			console.log(indexNumber);
		}
		if(question.fileName){
			await db.sql`INSERT INTO Question (ID, Title, Type, IndexNumber, MultimediaPath) 
										VALUES (${questionId},${question.title},${question.type},${indexNumber},${question.fileName})`;
		}else{
			await db.sql`INSERT INTO Question (ID, Title, Type, IndexNumber) 
										VALUES (${questionId},${question.title},${question.type},${indexNumber})`;
		}
		return questionId;
	}catch(err){
		console.error(err);
		return null;
	}
}