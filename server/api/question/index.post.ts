export default defineEventHandler(async (event) => {
	try{
		const {title, type, answers, file, tournamentID} = await readBody<{
			title: string
			type: number
			answers: Answer[]
			file?: ServerFile
			tournamentID: string
		}>(event);
		let fileName;
		if(file){
			fileName = await storeFileLocally(file, 8, '/questionsFile');
		}
		let questionID = await addQuestion({title, type, fileName}, tournamentID);
		if(questionID == null) return false;
		await addAnswers(questionID, answers)
		await addQuestionTournament(questionID, tournamentID);
		return true
	}catch(error){
		console.error(error);
    	return error
	}
})
