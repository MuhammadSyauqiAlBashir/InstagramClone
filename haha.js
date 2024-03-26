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
      '_id': new ObjectId('66025073c4a34dc17e2ca9ef')
    }
  }, {
    '$lookup': {
      'from': 'Follows', 
      'localField': '_id', 
      'foreignField': 'followingId', 
      'as': 'followers'
    }
  }, {
    '$lookup': {
      'from': 'Users', 
      'localField': 'followers.followerId', 
      'foreignField': '_id', 
      'as': 'followerDetail'
    }
  }, {
    '$lookup': {
      'from': 'Follows', 
      'localField': '_id', 
      'foreignField': 'followerId', 
      'as': 'following'
    }
  }, {
    '$lookup': {
      'from': 'Users', 
      'localField': 'following.followingId', 
      'foreignField': '_id', 
      'as': 'followingDetail'
    }
  }
];

const client = await MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('gc01-ig').collection('Users');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();