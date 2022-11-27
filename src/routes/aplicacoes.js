var express = require("express");
var router = express.Router();

var aplicacaoController = require("../controllers/aplicacaoController");

router.post("/cadastrar", function (req, res) {
    aplicacaoController.cadastrar(req, res);
})

router.get('/monitorando/:idServidor', function (req, res) {
    aplicacaoController.monitorando(req, res);
})

router.put('/editar', function (req, res) {
    aplicacaoController.editar(req, res)
})

router.delete('/:idAplicacao&:componente', function (req, res) {
    aplicacaoController.deletar(req,res)
})

module.exports = router