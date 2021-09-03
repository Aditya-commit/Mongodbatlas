import { connectToDatabase } from '../../../util/mongodb';

export default async (req , res)=>{
	console.log(req.body);
	let key , value , db , col;

	for(const i in req.body){
		if(i=='database' || i=='collection'){
			if(i=='database'){
				db=req.body[i].toString();
			}
			else{
				col=req.body[i].toString();
			}
		}
		else{
			key=i.toString();
			value=req.body[i].toString();
		}
	}

	const { client } = await connectToDatabase();

	const inserts = await client.db(db).collection(col).insertOne({[key]:value});
	res.json(inserts.insertedId);
}