import { connectToDatabase } from '../../../util/mongodb';

export default async (req , res)=>{
	console.log('Collection list');
	const dbname = req.query['name'];
	const { client } = await connectToDatabase();
	const collections=await client.db(dbname).listCollections().toArray();
	res.json(collections);
}