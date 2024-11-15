export default defineEventHandler(async (event) => {
  try{
    const { questionID } = await readBody<{
      questionID: string;
    }>(event);
    return deleteQuestion(questionID);
  }catch(err){ 
    console.error(err);
    throw new Error(String(err));
  }
})
