var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  global.db.issues.findAll((err, docs) => {
    if (err) {
      return console.log(err);
    }

    res.render('index', { title: 'Lista de Tarefas', docs: docs });
  })
});

// issue
router.get('/issue', function(req, res, next) {
  res.render('issue', { title: 'Nova tarefa', doc: {}, action: '/issue' });
});


// user
router.get('/user', function(req, res, next) {
  res.render('user', { title: 'Novo Cadastro', doc: {}, action: '/user' });
});



module.exports = router;
