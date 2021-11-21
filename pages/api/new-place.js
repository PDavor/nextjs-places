import { MongoClient } from "mongodb";
// /api/new-place
// POST /api/new-place
const handler = async (req, res) => {
  const client = await MongoClient.connect(
    "mongodb+srv://pdavor:pdavor123@cluster0.2nd8w.mongodb.net/places?retryWrites=true&w=majority"
  );
  const db = client.db();
  const placesCollection = db.collection("places");

  const result = await placesCollection.insertOne(req.body);
  client.close();
  res.status(201).json(res);
};

export default handler;
