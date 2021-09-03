import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'bson';

export default async(req, res) => {
    const db = req.body['database'];
    const col = req.body['collection'];

    const { client } = await connectToDatabase();
    const delete_res = await client.db(db).collection(col).deleteOne({ '_id': new ObjectId(req.body['_id']) });
    res.json(delete_res);
}