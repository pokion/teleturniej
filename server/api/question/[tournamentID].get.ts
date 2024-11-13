export default defineEventHandler(async (event): Promise<Question[]> => {
  try{
    const id = getRouterParam(event, 'tournamentID');
    if(!id) throw new Error('Id must be provided!')
    return await getQuestions(id);
  }catch(err){
    console.error(err)
    throw new Error(String(err));
  }
})
