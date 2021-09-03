import { connectToDatabase } from '../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async(req, res) => {
    console.log('update api is called again');
    const db = req.body['database'];
    const col = req.body['collection'];
    const id = req.body['id'];
    const key = req.body['key'];
    const value = req.body['value'];

    const { client } = await connectToDatabase();
    const result = await client.db(db).collection(col).updateOne({ "_id": new ObjectId(id) }, { $set: {
            [key]: value } });
    res.json(result);
}