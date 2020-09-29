var express = require('express');
var router = express.Router();

// novo
router.post('/', function (req, res) {
  var name = req.body.name;
  var years = parseInt(req.body.years);

  global.db.users.insert({ name, years }, (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  })
});

// lista todos
router.get('/', function(req, res, next) {
  global.db.users.findAll((err, docs) => {
    if (err) {
      return console.log(err);
    }

    res.render('users', { title: 'Lista de Usuários', docs: docs });
  });
});

// abre edição
router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  global.db.users.findOne(id, (err, docs) => {
    if(err) {
      return console.log(err);
    }
    res.render('user', { title: 'Editar usuário', doc: docs[0], action: '/user/' + docs[0]._id });
  });
});

// edita
router.post('/:id', function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var years = parseInt(req.body.years);
  global.db.users.update(id, {name, years}, (err, result) => {
        if(err) {
          return console.log(err);
        }
        res.redirect('/users');
    });
});

module.exports = router;