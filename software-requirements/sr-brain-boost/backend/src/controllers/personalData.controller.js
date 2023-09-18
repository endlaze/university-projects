exports.findById = (req, res) => {
  const id = parseInt(req.body.id)
  const MongoClient = require('mongodb').MongoClient;
  const uri = process.env.MONGODB_URI 
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("reque").collection("personaldata");
    collection.findOne({_id: id}, (err, result)=> {
      if (err) {
        res.status(401).send(err)
      } else {
        res.status(200).send(result)
      }
    })
    client.close();
  });

}