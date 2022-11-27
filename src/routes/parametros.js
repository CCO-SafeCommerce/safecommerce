var express = require('express');
var router = express.Router();

var parametroController = require('../controllers/parametroController');

router.get('/obterParametros/:idServer', (req, res) => {
    parametroController.obterParametros(req, res)
});

router.put('/atualizar', (req, res) => {
    parametroController.atualizar(req, res)
})

module.exports = router;