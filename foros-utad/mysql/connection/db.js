require('dotenv').config();
import mysql from 'serverless-mysql';
const db = mysql({
	config: {
		host: process.env.HOST_DB,
		port: process.env.PORT_DB,
		database: process.env.DATABASE,
		user: process.env.USER_DB,
		password: process.env.PASSWORD_DB
	}
});
export default async function excuteQuery( query, values ) {
	try {
		const results = await db.query(query, values);
		await db.end();
		return results;
	} catch (error) {
		return { error };
	}
}
