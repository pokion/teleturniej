export default async function(questionId: string, answers: Answer[]): Promise<null | void>{
	try{
		const db = useDatabase();
		for(const answer of answers){
			if(answer.title == '') continue;
			let answerID = uid();
			await db.sql`INSERT INTO Answer (ID, Title, IsAnswerCorrect) 
								VALUES (${answerID},${answer.title},${answer.isCorrect.toString()})`;
			await db.sql`INSERT INTO QuestionAnswer (AnswerID, QuestionID)
								VALUES (${answerID}, ${questionId})`
		}
	}catch(err){
		console.error(err)
		return null
	}
}
