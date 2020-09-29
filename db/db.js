
const config = require("../config.json");
const mongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

mongoClient.connect(config.dbConStr, { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("hospedin"))
            .catch(err => console.log(err))
