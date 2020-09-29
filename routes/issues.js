var express = require('express');
var router = express.Router();

// novo
router.post('/', function (req, res) {
    var status = req.body.status;
    var title = req.body.title;
    var description = req.body.description;
    var responsible_userId = req.body.responsible_userId;
    var forecastDate = req.body.forecastDate;
    var priority = req.body.priority;

    global.db.issues.insert({
        status,
        title,
        description,
        responsible_userId,
        forecastDate,
        priority
    }, (err, result) => {

        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    })
});

// lista todos
router.get('/', function (req, res, next) {
    global.db.issues.findAll((err, docs) => {
        if (err) {
            return console.log(err);
        }

        res.render('issues', { title: 'Lista de Tarefas', docs: docs });
    });
});

// abre edição
router.get('/:id', function (req, res, next) {
    var id = req.params.id;

    Promise.all([
        // obtem issue
        new Promise(function (resolve, reject) {
            global.db.issues.findOne(id, (err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            })
        }),
        // otem usuários
        new Promise(function (resolve, reject) {
            global.db.users.findAll((err, docs) => {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            })
        })
    ]).then(function (results) {
        var doc = _.get(results[0], "0");
        var users = results[1];

        res.render('issue', { title: 'Detalhes da tarefa', doc: doc, users: users, action: '/issue/' + _.get(doc, "_id") });

    }).catch((err) => {
        return console.log(err);
    });
});

// edita
router.post('/:id', function (req, res) {
    var id = req.params.id;
    var status = req.body.status;
    var title = req.body.title;
    var description = req.body.description;
    var responsible_userId = req.body.responsible_userId;
    var forecastDate = req.body.forecastDate;
    var priority = req.body.priority;

    global.db.issues.update(id, {
        status,
        title,
        description,
        responsible_userId,
        forecastDate,
        priority
    }, (err, result) => {

        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

module.exports = router;