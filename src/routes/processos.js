var express = require('express');
var router = express.Router();

var processoController = require('../controllers/processoController');

router.get("/obterProcessos/:idServidor", (req,res)=>{
    processoController.obterProcessos(req, res);
})

router.post("/encerrarProcessos/", (req,res)=>{
    processoController.encerrarProcessos(req, res);
})

router.get("/obterProcessosNotDesejavel/:idServidor", (req,res)=>{
    processoController.obterProcessosNotDesejavel(req, res);
})

router.get("/obterProcessosDesejavel/:idServidor", (req,res)=>{
    processoController.obterProcessosDesejavel(req, res);
})

router.post("/modificarPermissao/", (req,res)=>{
    processoController.modificarPermissao(req, res);
})

module.exports = router