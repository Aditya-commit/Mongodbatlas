import { connectToDatabase } from '../../../util/mongodb';

export default async(req , res)=>{
	const [db , col] = req.query['database'];

	const { client } = await connectToDatabase();

	const add_db = await client.db(db).createCollection(col);
	res.json("status",200);
}