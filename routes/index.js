var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  global.db.findAll((err, docs) => {
    if (err) {
      return console.log(err);
    }

    res.render('index', { title: 'Lista de Usuários', docs: docs });
  })
});

router.get('/new_user', function (req, res, next) {
  res.render('new_user', { title: 'Cadastrar usuário' });
});

router.post('/new_user', function (req, res) {
  var name = req.body.name;
  var years = parseInt(req.body.years);

  global.db.insert({ name, years }, (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  })
});

module.exports = router;
