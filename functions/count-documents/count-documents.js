const mongo = require('mongodb');
const superagent = require('superagent');

exports.handler = async (event, context) => {
    mongo.MongoClient
        .connect(process.env.MONGODB_URI,
            function (err, database) {
                await database
                    .db('Hifi')
                    .collection("records")
                    .countDocuments({ status: { $exists: false } })
                    .then(function (result) {
                        console.log(result);
                        await superagent.get(process.env.MESSAGE_API + result)
                            .then(res => {
                                console.log(res);
                            })
                            .catch(err => {
                                // err.message, err.response
                            });
                    });
            });
};