export default async function(questionID: string): Promise<boolean>{
	try{
		const db = useDatabase();
        const questionSelectPrep = db.prepare('SELECT AnswerID FROM QuestionAnswer WHERE QuestionID = ?');
		const questionAnswerDeletePrep = db.prepare('DELETE FROM QuestionAnswer WHERE QuestionID = ?');
		const answerDeletePrep = db.prepare('DELETE FROM Answer WHERE ID = ?');
		const questionDeletePrep = db.prepare('DELETE FROM Question WHERE ID = ?');
		const questionObject = await getQuestion(questionID);
		const questionsWithHigherIndexPrep = db.prepare('SELECT ID, IndexNumber FROM Question WHERE IndexNumber > ?');
		const questionIndexUpdate = db.prepare('UPDATE Question SET IndexNumber = ? WHERE ID = ?');
		const tournamentQuestionDelete = db.prepare('DELETE FROM TournamentQuestion WHERE QuestionID = ?')
		let questions = await questionsWithHigherIndexPrep.all(questionObject.IndexNumber);
		let answersID = await questionSelectPrep.all(questionID);
		await questionAnswerDeletePrep.run(questionID);
		for(let {AnswerID} of answersID){ 
			await answerDeletePrep.run(AnswerID);
		}
		for(let question of questions){
			await questionIndexUpdate.run(question.IndexNumber-1, question.ID)
		}
		await tournamentQuestionDelete.run(questionID)
		await questionDeletePrep.run(questionID)
        return true
	}catch(err){
		console.error(err);
		throw new Error(String(err));
	}
}
