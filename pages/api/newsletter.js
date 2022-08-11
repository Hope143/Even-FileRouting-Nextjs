import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email Address!" });
      return;
    }

    let client;

    //we can name our client var to be available globally
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(422).json({ message: "Connecting to database Failed!" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(422).json({ message: "Inserting Data Failed!" });
      return;
    }

    res.status(201).json({ message: "Signed Up!" });
  }
}

export default handler;

// import { MongoClient } from "mongodb";

// async function connectDatabase() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://dbUser:xiJf98m2CAT6RwSu@cluster0.rxwbb.mongodb.net/?retryWrites=true&w=majority"
//   );

//   return client;
// }

// async function insertDocument(client, document) {
//   const db = client.db("events");
//   await db.collection("newsletter").insertOne(document);
// }

// async function handler(req, res) {
//   if (req.method === "POST") {
//     const userEmail = req.body.email;

//     if (!userEmail || !userEmail.includes("@")) {
//       res.status(422).json({ message: "Invalid email address." });
//       return;
//     }

//     let client;

//     try {
//       client = await connectDatabase();
//     } catch (error) {
//       res.status(500).json({ message: "Connecting to the database failed!" });
//       return; //to prevent further executing if failed
//     }

//     try {
//       await insertDocument(client, { email: userEmail });
//       client.close();
//     } catch (error) {
//       res.status(500).json({ message: "Inserting data failed!" });
//       return;
//     }

//     res.status(201).json({ message: "Signed Up!" });
//   }
// }
// export default handler;
