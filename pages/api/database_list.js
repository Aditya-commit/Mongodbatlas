import { connectToDatabase } from '../../util/mongodb';

export default async(req ,res)=>{
	console.log('Database fetch');
	const { client } = await connectToDatabase();
	const result = await client.db().admin().listDatabases();
	res.json(result);
}