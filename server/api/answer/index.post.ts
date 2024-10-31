export default defineEventHandler(async (event) => {
	try{
		const {title, isCorrect, questionID} = await readBody(event);
		const db = useDatabase();
		const result = await db.sql`INSERT INTO Answer (Title, IsAnswerCorrect) VALUES (${title},${isCorrect}) RETURNING *`;
		return result
	}catch(error){
		console.error(error);
    return error
	}
})