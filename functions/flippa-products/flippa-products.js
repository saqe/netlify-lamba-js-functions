const { Console } = require('console');
const e = require('express');
const mongo = require('mongodb');

exports.handler = async (event, context, callback) => {
    const client=await mongo.
                MongoClient.connect(process.env.MONGODB_FLIPPA_URI, 
                    { useUnifiedTopology: true })
                .catch(err => { console.log(err);});
    try{
        console.info("Database connected");
        const records = client
            .db('Ads')
            .collection('records');

        const product_id=event.queryStringParameters.product
        if (product_id){
            const result = await records.findOne({id : parseInt(product_id)});
            client.close();
            if (result) {
                callback(null, {statusCode: 200, body: JSON.stringify(result)});
            }else{
                callback(null, {statusCode: 404, body: JSON.stringify({'status':404, 'message':`${product_id} not found`})});
            }
        }else{
            callback(null, {
                statusCode: 300,
                body: JSON.stringify({'message':'There must be a product id'})
            });
        }
    } catch (err) {
        console.log(err);
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({'status':500,'message':JSON.stringify(err)})
        });
    }
};