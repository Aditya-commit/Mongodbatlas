import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async(req , res) => {
	
	const db = req.body['database'];
	const collection = req.body['collection'];
	const query = req.body['query'];

	let id_found = false;

	for(const query_key in query[1]){
		if(query_key == '_id'){
			id_found = true;
		}
	}

	if(id_found){
		res.json('can\'t update an id field');
	}

	else{
		for(const query_key in query[0]){
			if(query_key == '_id'){
				query[0][query_key] = new ObjectId(query[0][query_key]);
			}
		}

		const { client } = await connectToDatabase();

		const update_result = await client.db(db).collection(collection).updateMany(query[0] , {$set:query[1]});

		res.json(update_result);
	}

}