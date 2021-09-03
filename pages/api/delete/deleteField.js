import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async(req, res) => {

    const db = req.body['database'];
    const col = req.body['collection'];
    const id = req.body['_id'];

    const { client } = await connectToDatabase();
    const delete_response = await client.db(db).collection(col).updateOne({'_id': new ObjectId(id)}, {
        $unset: {
            [req.body['obj_key']]: ""
        }
    });
    res.json(delete_response);

}