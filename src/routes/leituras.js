var express = require('express');
var router = express.Router();

var leituraController = require('../controllers/leituraController');

router.get("/obterDadosCPU/:idServidor", (req,res)=>{
    leituraController.obterDadosCPU(req, res);
})

router.get("/obterDadosUsoCpuDia/:idServidor", (req,res)=>{
    leituraController.obterDadosUsoCpuDia(req, res);
})

router.get("/obterDadosCPUCore/:idServidor", (req,res)=>{
    leituraController.obterDadosCPUCore(req, res);
})
router.get("/obterDadosFreq/:idServidor", (req,res)=>{
    leituraController.obterDadosFreq(req, res);
})
router.get("/obterDadosFreqDia/:idServidor", (req,res)=>{
    leituraController.obterDadosFreqDia(req, res);
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

router.get("/obterDadosTemperatura/:idServidor", (req,res)=>{
    leituraController.obterDadosTemperatura(req,res);
})

router.get("/obterDadosTemperaturaDia/:idServidor", (req,res)=>{
    leituraController.obterDadosTemperaturaDia(req,res);
})

router.get("/obterDadosAlerta", (req,res)=>{
    leituraController.obterDadosAlerta(req,res);
})

router.get("/obterMaiorAlertas", (req,res)=>{
    leituraController.obterMaiorAlertas(req,res);
})

router.get("/obterDadosEmergencia", (req,res)=>{
    leituraController.obterDadosEmergencia(req,res);
})

router.get("/appCorHw/:idServidor", (req, res) => {
    leituraController.appsCorHw(req,res);
})

router.get("/obterUltimaTemp", (req, res) => {
    leituraController.obterUltimaTemp(req,res);
})

module.exports = router;