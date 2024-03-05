import mysql from 'serverless-mysql';
const db = mysql({
	config: {
		host: 'localhost',
		port: 3306,
		database: 'foros_utad',
		user: 'utad',
		password: 'contrasenaSegura'
	}
});
export default async function excuteQuery({ query, values }) {
	try {
		const results = await db.query(query, values);
		await db.end();
		return results;
	} catch (error) {
		return { error };
	}
}
