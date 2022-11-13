CREATE DATABASE safecommerce;
USE safecommerce;

create table Empresa(
	idEmpresa int primary key auto_increment,
    nome varchar(45),
    cnpj char(14) unique
);

INSERT INTO Empresa VALUES (null,'Americanas','00776574000156');

create table Usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
	email varchar(45) unique,
    cpf char(11) unique,
	senha varchar(65),
	fkUsuario int,
    foreign key (fkUsuario) references Usuario(idUsuario),
    fkEmpresa int,
    foreign key (fkEmpresa) references Empresa(idEmpresa)
);

INSERT INTO Usuario 
	VALUES (null,'Admin Americanas','admin-americanas@safecommerce.com','59015195072','$2b$08$7gr/7.BAK4wWNG5XHSeZAuGYQioR75X4.3C3GuGpAE9UpiQU7cReq',null,1),
    (null,'Fernando Miranda','fernando.miranda@infra.americanas.com','00523065000','$2b$08$3rCRv5XuiCp9cK1OfrxKQ.F4CAD4CWj8NQ2HP1l/ufhSQYzUAoAs6',1,1);

create table Servidor(
	idServidor int primary key auto_increment,
    modelo varchar(45),
	so varchar(45),
    enderecoMac varchar(17) unique,
    fkEmpresa int,
    foreign key (fkEmpresa) references Empresa(idEmpresa)
);

INSERT INTO Servidor VALUES (null,'Dell PowerEdge T150', 'Linux', '98:83:89:EC:DB:2C',1);

create table Metrica(
	idMetrica int primary key auto_increment,
    nome varchar(45),
    unidadeMedida varchar(45)
);

INSERT INTO Metrica VALUES 
	(null, "Porcentagem de uso da CPU", "%"), #1
	(null, "Quantidade de CPU logica","vCPU"), #2
	(null, "Porcentagem de uso da CPU por core","%"), #3
	(null, "Frequência de uso da CPU", "MHz"), #4
	(null, "Total de Memoria RAM", "GB"), #5
	(null, "Porcentagem de uso da Memoria RAM", "%"), #6
	(null, "Total de Disco", "GB"), #7
	(null, "Porcentagem de uso de Disco", "%"), #8
	(null, "Lido pelo Disco", "ms"), #9
	(null, "Escrito pelo Disco", "ms"), #10
    (null, "Temperatura da CPU", "ºC"), #11
    (null, "Processos", null), #12
    (null, "Quantidade requisições HTTP", "HTTP Request"), #13
    (null, "Status requisições HTTP", "Inteiro"), #14
    (null, "Tempo médio de resposta HTTP", "ms"); #15

create table Parametro(
	fk_Servidor int,
    foreign key (fk_Servidor) references Servidor(idServidor),
    fk_Metrica int,
    foreign key (fk_Metrica) references Metrica(idMetrica)
);

INSERT INTO Parametro 
	VALUES (1,1), (1,2), (1,5), (1,6), (1,7), (1,8), (1,12);

create table Leitura(
	fkServidor int,
    foreign key (fkServidor) references Servidor(idServidor),
    fkMetrica int,
    foreign key (fkMetrica) references Metrica(idMetrica),
	dataLeitura datetime,
    valor_leitura varchar(45),
    situacao char(1) DEFAULT 'n',
    componente varchar(45),
    primary key (fkServidor, fkMetrica, dataLeitura, componente)
);

create table Processo(
	fkServidor int,
    foreign key (fkServidor) references Servidor(idServidor),
    pid int,
	dataLeitura datetime,
    nome varchar(40),    
    usoCpu decimal(5,2),
    situacaoCpu char(1) DEFAULT 'n',
    usoRam decimal(5,2),
    situacaoRam char(1) DEFAULT 'n',
    primary key (dataLeitura, nome, pid, fkServidor)
);

create table Permissao_Processo(
	idPermissao int primary key auto_increment,
    nome varchar(40),
    permissao Boolean,
    fkServidor int,
    foreign key (fkServidor) references Servidor(idServidor)
);

create table Aplicacao(
	idAplicacao int primary key auto_increment, 
	nome varchar(45),
	url varchar(60) unique,
    fkServidor int,
    foreign key (fkServidor) references Servidor(idServidor)
);

create view visaoGeralServidores as
select 
	s.idServidor,
    s.fkEmpresa,
	s.modelo,
    s.so,
    s.enderecoMac,
    (select valor_leitura from Leitura where fkServidor = s.idServidor AND fkMetrica = 2 order by dataLeitura desc limit 1) as 'qtdCPU',
    (select valor_leitura from Leitura where fkServidor = s.idServidor AND fkMetrica = 5 order by dataLeitura desc limit 1) as 'qtdRAM',
    (select valor_leitura from Leitura where fkServidor = s.idServidor AND fkMetrica = 7 order by dataLeitura desc limit 1) as 'qtdDisco',
    (select dataLeitura from Leitura where fkServidor = s.idServidor order by dataLeitura desc limit 1) as 'ultimoRegistro'
from Servidor s;

create view leituraCPU as 
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 1;

create view leituraCoreCPU as 
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
    l.componente as "core",
	l.fkServidor
from Leitura as l  
where l.fkMetrica = 3;

create view leituraFreq as 
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 4;

create view leituraRAM as 
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 6;

create view leituraDisco as 
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 8;

create view leituraLDisco as 
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 9;

create view leituraEDisco as 
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 10;

create view leituraTemperatura as
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 11;
	
create view leituraHTTPRequest as
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 13;

create view leituraHTTPStatus as
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 14;

create view leituraHTTPResponse as
select 
	l.fkMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 15;

create view leituraHTTP as
select
	a.idAplicacao,
    l.dataLeitura as 'horario',
    (select 
		valor_leitura 
	from Leitura 
	where 
		Leitura.dataLeitura = l.dataLeitura 
		and Leitura.fkMetrica = 13
        and Leitura.fkServidor = l.fkServidor
        and Leitura.componente = a.nome) as 'resquest',
	(select 
		valor_leitura 
	from Leitura 
	where 
		Leitura.dataLeitura = l.dataLeitura 
		and Leitura.fkMetrica = 14
        and Leitura.fkServidor = l.fkServidor
        and Leitura.componente = a.nome) as 'status',
	(select 
		valor_leitura 
	from Leitura 
	where 
		Leitura.dataLeitura = l.dataLeitura 
		and Leitura.fkMetrica = 15
        and Leitura.fkServidor = l.fkServidor
        and Leitura.componente = a.nome) as 'response',
    l.fkServidor
from Leitura as l
inner join Aplicacao as a on a.fkServidor = l.fkServidor;

create view situacaoLeitura as
select
	l.fkMetrica,
    l.componente,
    (select 
		count(*) 
	from Leitura 
    where 
		Leitura.fkMetrica = l.fkMetrica 
        and Leitura.situacao = 'a'
        and Leitura.fkServidor = l.fkServidor) as 'qtdAvisos',
	(select 
		count(*) 
	from Leitura 
    where 
		Leitura.fkMetrica = l.fkMetrica 
        and Leitura.situacao = 'e'
        and Leitura.fkServidor = l.fkServidor) as 'qtdEmergencias',
    l.fkServidor
from Leitura as l
where l.fkMetrica in (1,3,4,6,8,9,10,11);

-- Configurar para o java carregar o csv
SET GLOBAL local_infile=1;
SHOW GLOBAL VARIABLES LIKE 'local_infile';


