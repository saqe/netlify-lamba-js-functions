const mongo = require('mongodb');
const superagent = require('superagent');

exports.handler = async (event, context) => {
    console.log("In-Handler");
    console.log("Trying to connect");
    const client=await mongo.MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true })
            .catch(err => { console.log(err);});
    try {
        console.log("connected");
        const records = client
            .db('Hifi')
            .collection('records');
        
        const countDocuments=await records.countDocuments({ status: { $exists: false } });
        const totalDocuments=await records.countDocuments({});
        superagent.get(process.env.MESSAGE_API + countDocuments).then({});
    } catch (err) {
        console.log(err);
    } finally {
        console.log("completed");
        client.close();
        return {
            statusCode :200,
            body:'success'
        };
    }
};