
var ObjectId = require("mongodb").ObjectId;

const issuesDB = {
    findAll: function (callback) {  
        global.conn.collection("issues").find({}).toArray(callback);
    },

    findOne: function (id, callback){  
        global.conn.collection("issues").find(new ObjectId(id)).toArray(callback);
    },

    insert: function (user, callback){
        global.conn.collection("issues").insert(user, callback);
    },

    update: function (id, obj, callback){
        global.conn.collection("issues").updateOne({_id: new ObjectId(id)}, {$set: obj}, callback);
    }
}

global.db.issues = issuesDB;
