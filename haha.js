import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$sort': {
      'createdAt': -1
    }
  }, {
    '$lookup': {
      'from': 'Users', 
      'localField': 'authorId', 
      'foreignField': '_id', 
      'as': 'author'
    }
  }
];

const client = await MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('gc01-ig').collection('Posts');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();