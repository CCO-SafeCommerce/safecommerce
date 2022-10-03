 process.env.AMBIENTE_PROCESSO = "desenvolvimento";
//process.env.AMBIENTE_PROCESSO = "producao";

const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require('dotenv');
const PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

const app = express();

const indexRouter = require("./src/routes/index");
const usuarioRouter = require("./src/routes/usuarios");
const serverRouter = require('./src/routes/servers');
// const { createPages } = require('./src/controllers/serverController');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/servers", serverRouter);
// app.use("/python", createPages);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando!\n 
    Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO}`
);
});
