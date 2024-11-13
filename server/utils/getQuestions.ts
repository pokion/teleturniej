export default async function(questionId: string): Promise<Question[]>{
	try{
		const db = useDatabase();
		let { rows: questions }: { rows: Question[] } = await db.sql`
				SELECT q.ID AS id
					 , q.Title AS title
					 , t.Name AS type
					 , q.IndexNumber AS indexNumber
					 , q.MultimediaPath AS fileName
				FROM TournamentQuestion tq
				LEFT JOIN Question q ON q.ID = tq.QuestionID
				LEFT JOIN QuestionType t ON t.ID = q.Type
				WHERE tq.TournamentID = ${questionId}
				ORDER BY indexNumber ASC
			`;
		let answerQuery = db.prepare(`SELECT a.ID AS id
										   , a.Title AS title
										   , a.IsAnswerCorrect AS isCorrect
									  FROM QuestionAnswer qa
									  LEFT JOIN Answer a ON a.ID = qa.AnswerID
									  WHERE qa.QuestionID = ?`);
		for(let question of questions){
			if(!question.id) continue;
			question.answers = await answerQuery.all(question.id) as Answer[]
		}
		return questions;
	}catch(err){
		console.error(err);
		throw new Error(String(err))
	}
}