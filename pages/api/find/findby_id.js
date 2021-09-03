import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

export default async(req, res) => {
    const { client } = await connectToDatabase();

    const finds = await client.db('test').collection('userdata').find({ "_id": new ObjectId("60c0e7a1aaac8a1537c276f8") }).toArray();
    console.log(finds);
    res.end('f');
}