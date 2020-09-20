const mongo = require('mongodb');

exports.handler = async (event, context) => {
    const client=await mongo.
                MongoClient.connect(process.env.MONGODB_FLIPPA_URI, 
                    { useUnifiedTopology: true })
                .catch(err => { console.log(err);});
    try{
        console.log("Database connected");
        const records = client
            .db('Hifi')
            .collection('records');
            
        const product=await records.findOne({id : context.params. }, function(err, result) {
            if (err) throw err;
            console.log(result.name);
            db.close();
          }););
              
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