
const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("hospedin"))
            .catch(err => console.log(err))


function findAll(callback) {  
    global.conn.collection("users").find({}).toArray(callback);
}

function insert(user, callback){
    global.conn.collection("users").insert(user, callback);
}


module.exports = {
    findAll,
    insert
}
