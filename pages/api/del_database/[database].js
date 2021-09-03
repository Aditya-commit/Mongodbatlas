import { connectToDatabase } from '../../../util/mongodb';

export default async(req , res)=>{
	const { client } = await connectToDatabase();

	const deldb = await client.db(req.query['database']).dropDatabase();
	res.json(deldb);
}