export default defineEventHandler(async (event) => {
	try{
		const name = await getRouterParam(event, 'name');
		const db = useDatabase();
		const player = await db.sql`SELECT * FROM Player WHERE Name = ${name}`;
		return player.rows
	}catch(error){
		console.error(error);
	}
})