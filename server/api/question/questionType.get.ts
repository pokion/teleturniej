export default defineEventHandler(async (): Promise<{ rows: Array<QuestionType>}> => {
  let db = useDatabase();
  return await db.sql`SELECT * FROM QuestionType`;
})
