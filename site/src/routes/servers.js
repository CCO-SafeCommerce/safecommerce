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

module.exports = router;