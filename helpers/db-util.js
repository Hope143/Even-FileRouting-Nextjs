import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://dbUser:xiJf98m2CAT6RwSu@cluster0.rxwbb.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db("events");
  await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, eventId, sort) {
  const db = client.db("events");
  const documents = await db
    .collection(collection)
    .find({ eventId: eventId }) //fetch all data
    .sort(sort) //sort in descending order since it is -1
    .toArray();

  return documents;
}
