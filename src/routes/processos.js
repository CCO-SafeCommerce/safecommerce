var express = require('express');
var router = express.Router();

var processoController = require('../controllers/processoController');

router.get("/obterProcessos/:idServidor", (req,res)=>{
    processoController.obterProcessos(req, res);
})

router.post("/encerrarProcessos/:idServidor", (req,res)=>{
    processoController.encerrarProcessos(req, res);
})

router.get("/obterProcessosNotDesejavel/:idServidor", (req,res)=>{
    processoController.obterProcessosNotDesejavel(req, res);
})

module.exports = router