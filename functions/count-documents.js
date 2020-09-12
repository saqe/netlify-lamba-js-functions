const mongo = require('mongodb');

exports.handler = async (event, context) => {
    mongo.MongoClient
    return { 
        statusCode : 200, 
        body : "Connection with database is done!"
    };
};