export default defineEventHandler(async (event) => {
	try{
		const body = await readBody(event);
		const db = useDatabase();
		const result = await db.sql`INSERT INTO Tournament (Name) VALUES (${body.name})`;
		const id = await db.sql`SELECT ID FROM Tournament WHERE Name = ${body.name}`;
		return id.rows
	}catch(error){
		console.error(error);
	}
})