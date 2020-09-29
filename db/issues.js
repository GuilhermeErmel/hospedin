
var ObjectId = require("mongodb").ObjectId;

function addResponsibleFK(obj) {
    if (!_.isEmpty(obj.responsible_userId)) {
        obj.responsible_userId = new ObjectId(obj.responsible_userId);
    }
}

const issuesDB = {
    findAll: function (callback) {
        global.conn.collection("issues").find({}).toArray(callback);
    },

    findOne: function (id, callback) {
        global.conn.collection("issues").find(new ObjectId(id)).toArray(callback);
    },

    insert: function (obj, callback) {
        addResponsibleFK(obj);
        global.conn.collection("issues").insert(obj, callback);
    },

    update: function (id, obj, callback) {
        addResponsibleFK(obj);
        global.conn.collection("issues").updateOne({ _id: new ObjectId(id) }, { $set: obj }, callback);
    }
}

global.db.issues = issuesDB;
