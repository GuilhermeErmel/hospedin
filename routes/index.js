var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  global.db.issues.findAll((err, docs) => {
    if (err) {
      return console.log(err);
    }

    // separa em seções
    var newIssues = _.filter(docs, { status: 'new' });
    var inProgressIssues = _.filter(docs, { status: 'inProgress' });
    var stoppedIssues = _.filter(docs, { status: 'stopped' });
    var doneIssues = _.filter(docs, { status: 'done' });
    var canceledIssues = _.filter(docs, { status: 'cancel' });

    res.render('index', { title: 'Lista de Tarefas', newIssues, inProgressIssues, stoppedIssues, doneIssues, canceledIssues });
  })
});

// Nova tarefa
router.get('/issue', function (req, res, next) {
  global.db.users.findAll((err, users) => {
    if (err) {
      return console.log(err);
    }

    res.render('issue', { title: 'Nova tarefa', doc: {}, users: users, action: '/issue' });
  });
});

// Novo usuário
router.get('/user', function (req, res, next) {
  res.render('user', { title: 'Novo Cadastro', doc: {}, action: '/user' });
});

module.exports = router;