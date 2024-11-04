export default defineEventHandler(async (event) => {
	try{
		const db = useDatabase();
		const result = await db.sql`SELECT * FROM Answer`;

		return result
	}catch(error){
		console.error(error);
    	return error
	}
})