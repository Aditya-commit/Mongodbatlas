import { connectToDatabase } from '../../../../util/mongodb';

export default async(req , res)=>{
	const [db , col] = req.query.name;
	const { client } = await connectToDatabase();
	const delete_col = await client.db(db).collection(col).drop();
	res.json(delete_col);
}