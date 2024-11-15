import getQuestion from "~/server/utils/getQuestion";

export default defineEventHandler(async (event) => {
  try{
    const { questionID, tournamentID, newIndex } = await readBody<{
      questionID: string;
      newIndex: number;
      tournamentID: string
    }>(event);
    const db = useDatabase();
    let question = await getQuestion(questionID);
    let questionPrep = db.prepare('SELECT q.ID FROM TournamentQuestion LEFT JOIN Question q ON q.ID = TournamentQuestion.QuestionID WHERE TournamentQuestion.TournamentID = ? AND q.IndexNumber = ?');
    let questionSecondID = await questionPrep.get(tournamentID, newIndex);

    let updateQuestionIndexNumber = db.prepare('UPDATE Question SET IndexNumber = ? WHERE ID = ?');
    await updateQuestionIndexNumber.run(newIndex, question.ID);
    await updateQuestionIndexNumber.run(question.IndexNumber, questionSecondID.ID);
    return true;
  }catch(err){
    console.error(err);
    throw new Error(String(err));
  }
})
