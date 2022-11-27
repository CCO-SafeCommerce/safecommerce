var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post('/cadastrar', function (req, res) {
   usuarioController.cadastrar(req, res) 
});

router.put('/mudar-perfil', function (req, res) {
    usuarioController.atualizarPerfil(req, res);
})

router.put('/mudar-senha', function (req, res) {
    usuarioController.mudarSenha(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/dadosUsuarioJava", function (req, res) {
    usuarioController.dadosUsuarioJava(req, res);
});

router.get("/obterPorEmpresa/:idEmpresa", function (req, res) {
    usuarioController.obterPorEmpresa(req, res)
});

router.delete('/excluir/:idUsuario', function (req, res) {
    usuarioController.deletar(req,res)
})

module.exports = router;