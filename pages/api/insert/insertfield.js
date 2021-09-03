import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async(req , res)=>{
	const { client } = await connectToDatabase();
	const insertResult=await client.db(req.body['database']).collection(req.body['collection']).updateOne({'_id':new ObjectId(req.body['id'])} , {$set:req.body['data']})
	res.json(insertResult);
}