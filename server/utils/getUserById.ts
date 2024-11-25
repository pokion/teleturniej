export default async function(userID: string){
	try{
		const db = useDatabase();
		let user = await db.prepare('SELECT * FROM Player WHERE ID = ?').get(userID);
		return user;
	}catch(err){
		console.error(err);
		throw new Error(String(err))
	}
}