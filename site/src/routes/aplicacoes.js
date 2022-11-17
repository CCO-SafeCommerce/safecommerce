var express = require("express");
var router = express.Router();

var aplicacaoController = require("../controllers/aplicacaoController");

router.post("/cadastrar", function (req, res) {
    aplicacaoController.cadastrar(req, res);
})

module.exports = router