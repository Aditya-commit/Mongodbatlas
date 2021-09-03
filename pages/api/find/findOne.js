import { connectToDatabase } from '../../../util/mongodb';

export default async (req , res)=>{
	let db , col , query;
	
	for(const key in req.body){
		if(key == 'database'){
			db = req.body[key];
		}
		else{
			if(key=='collection'){
				col=req.body[key];
			}
			else{
				query=req.body[key];
			}
			
		}
	}

	const { client } = await connectToDatabase();

	const send_query = await client.db(db).collection(col).findOne(query);
	console.log(send_query);
	res.json(send_query);

}