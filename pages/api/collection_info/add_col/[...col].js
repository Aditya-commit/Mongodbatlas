import { connectToDatabase } from '../../../../util/mongodb';

export default async(req, res) => {
    const [db, col] = req.query.col;

    const { client } = await connectToDatabase();
    const create = await client.db(db).createCollection(col);
    res.json("status",200);
}