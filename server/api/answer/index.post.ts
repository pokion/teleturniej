export default defineEventHandler(async (event) => {
	try{
		const {title, isCorrect, questionID} = await readBody(event);
		const db = useDatabase();
		const id = uid();
		const result = await db.sql`INSERT INTO Answer (ID, Title, IsAnswerCorrect) VALUES (${id},${title},${isCorrect})`;
		let resultAnswerQuestion;
		if(result.success){
			resultAnswerQuestion = await db.sql`INSERT INTO QuestionAnswer (AnswerID, QuestionID) VALUES (${id}, ${questionID})`;
		}else{
			return result;
		}

		return resultAnswerQuestion
	}catch(error){
		console.error(error);
    	return error
	}
})