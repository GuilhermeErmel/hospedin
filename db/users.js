var ObjectId = require("mongodb").ObjectId;

function validateName(obj) {
    if (_.isEmpty(obj.name)) {
        throw new Error("Name is required.");
    }
}

const usersDB = {
    findAll: function (callback) {
        global.conn.collection("users").find({}).toArray(callback);
    },

    findOne: function (id, callback) {
        global.conn.collection("users").find(new ObjectId(id)).toArray(callback);
    },

    insert: function (obj, callback) {
        validateName(obj);
        global.conn.collection("users").insert(obj, callback);
    },

    update: function (id, obj, callback) {
        validateName(obj);
        global.conn.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: obj }, callback);
    }
}

global.db.users = usersDB;