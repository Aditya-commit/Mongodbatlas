import { connectToDatabase } from '../../../util/mongodb';

export default async (req , res)=>{
	const db_query=req.query['name'][0];
	const col_query= req.query['name'][1];
	
	const { client } = await connectToDatabase();
	const data = await client.db(db_query).collection(col_query).find().limit(100).toArray();
	res.json(data);
}