var express = require('express');
var router = express.Router();

var leituraController = require('../controllers/leituraController');

router.get("/obterDadosCPU/:idServidor", (req,res)=>{
    leituraController.obterDadosCPU(req, res);
})
router.get("/obterDadosCPUCore/:idServidor", (req,res)=>{
    leituraController.obterDadosCPUCore(req, res);
})
router.get("/obterDadosFreq/:idServidor", (req,res)=>{
    leituraController.obterDadosFreq(req, res);
})
router.get("/obterDadosRam/:idServidor", (req,res)=>{
    leituraController.obterDadosRam(req, res);
})
router.get("/obterDadosDisk/:idServidor", (req,res)=>{
    leituraController.obterDadosDisk(req, res);
})
router.get("/obterDadosRDisk/:idServidor", (req,res)=>{
    leituraController.obterDadosRDisk(req, res);
})
router.get("/obterDadosWDisk/:idServidor", (req,res)=>{
    leituraController.obterDadosWDisk(req, res);
})

module.exports = router;