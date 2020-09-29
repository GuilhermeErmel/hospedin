var ObjectId = require("mongodb").ObjectId;

const usersDB = {
    findAll: function (callback) {  
        global.conn.collection("users").find({}).toArray(callback);
    },

    findOne: function (id, callback){  
        global.conn.collection("users").find(new ObjectId(id)).toArray(callback);
    },

    insert: function (user, callback){
        global.conn.collection("users").insert(user, callback);
    },

    update: function (id, obj, callback){
        global.conn.collection("users").updateOne({_id: new ObjectId(id)}, {$set: obj}, callback);
    }
}

global.db.users = usersDB;