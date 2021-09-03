import { connectToDatabase } from '../../../util/mongodb';

export default async (req , res)=>{
	let db , col , query;

	for(const key in req.body){
		if(key == 'database'){
			db = req.body[key];
		}
		else{
			if(key == 'collection'){
				col = req.body[key];
			}
			else{
				query = req.body[key]
			}
		}
	}
	
	const { client } = await connectToDatabase();
	const find_result = await client.db(db).collection(col).find(query).toArray();
	res.json(find_result);
}