export default async function(questionID: string): Promise<QuestionDB>{
	try{
		const db = useDatabase();
        let questionPrep = db.prepare('SELECT * FROM Question WHERE ID = ?');
		return await questionPrep.get(questionID) as QuestionDB;
	}catch(err){
		console.error(err);
		throw new Error(String(err));
	}
}
