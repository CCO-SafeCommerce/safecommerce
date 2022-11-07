var express = require('express');
var router = express.Router();

var serverController = require('../controllers/serverController');

router.post("/getServers", (req, res) => {
    serverController.getServers(req, res);
});

router.post("/getCurrentServer", (req, res) => {
    serverController.getCurrentServer(req, res);
})

router.put('/', (req, res) => {
    serverController.updateServer(req, res)
});

router.delete('/:idServidor', (req, res) => {
    serverController.deleteServer(req, res)
});

router.post("/obterDadosCPU", (req,res)=>{
    serverController.obterDadosCPU(req, res);
})

router.post("/obterDadosCPUCore", (req,res)=>{
    serverController.obterDadosCPUCore(req, res);
})

router.post("/obterDadosFreq", (req,res)=>{
    serverController.obterDadosFreq(req, res);
})

router.post("/obterDadosRam", (req,res)=>{
    serverController.obterDadosRam(req, res);
})

router.post("/obterDadosDisk", (req,res)=>{
    serverController.obterDadosDisk(req, res);
})

router.post("/obterDadosRDisk", (req,res)=>{
    serverController.obterDadosRDisk(req, res);
})

router.post("/obterDadosWDisk", (req,res)=>{
    serverController.obterDadosWDisk(req, res);
})

module.exports = router;