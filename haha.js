import { MongoClient } from 'mongodb';
import {
  ObjectId
} from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      'followingId': new ObjectId('66025073c4a34dc17e2ca9ef'), 
      'followerId': new ObjectId('6602837774a3e63a7c7ecfbd')
    }
  }
];

const client = await MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('gc01-ig').collection('Follows');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();