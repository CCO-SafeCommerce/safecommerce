CREATE DATABASE safecommerce;
USE safecommerce;

CREATE TABLE Empresa (
	idEmpresa int primary key identity(1,1),
	nome varchar(45),
	cnpj char(14) unique
);

INSERT INTO Empresa (nome, cnpj) VALUES ('Americanas','00776574000156');

CREATE TABLE Usuario (
	idUsuario int primary key identity(1,1),
	nome varchar(45),
	email varchar(45) unique,
	cpf char(11) unique,
	senha varchar(65),
	fkUsuario int,
	foreign key (fkUsuario) references Usuario(idUsuario),
	fkEmpresa int,
	foreign key (fkEmpresa) references Empresa(idEmpresa),
);

INSERT INTO Usuario 
	(nome, email, cpf, senha, fkUsuario, fkEmpresa) VALUES 
	('Admin Americanas','admin-americanas@safecommerce.com','59015195072','$2b$08$7gr/7.BAK4wWNG5XHSeZAuGYQioR75X4.3C3GuGpAE9UpiQU7cReq',null,1), -- americanas#safecommerce
    ('Fernando Miranda','fernando.miranda@infra.americanas.com','00523065000','$2b$08$3rCRv5XuiCp9cK1OfrxKQ.F4CAD4CWj8NQ2HP1l/ufhSQYzUAoAs6',1,1); -- fernando1234

CREATE TABLE Servidor (
	idServidor int primary key identity(1,1),
	modelo varchar(45),
	so varchar(45),
	enderecoMac varchar(17) unique,
	fkEmpresa int,
	foreign key (fkEmpresa) references Empresa(idEmpresa)
);

INSERT INTO Servidor 
	(modelo, so, enderecoMac, fkEmpresa) VALUES
	('Dell PowerEdge T150', 'Linux', '98:83:89:EC:DB:2C', 1);

CREATE TABLE Metrica (
	idMetrica int primary key identity(1,1),
	nome varchar(45),
	unidadeMedida varchar(45)
);

INSERT INTO Metrica
	(nome, unidadeMedida) VALUES
	('Porcentagem de uso da CPU', '%'), --1
	('Quantidade de CPU logica','vCPU'), --2
	('Porcentagem de uso da CPU por core','%'), --3
	('Frequ�ncia de uso da CPU', 'MHz'), --4
	('Total de Memoria RAM', 'GB'), --5
	('Porcentagem de uso da Memoria RAM', '%'), --6
	('Total de Disco', 'GB'), --7
	('Porcentagem de uso de Disco', '%'), --8
	('Lido pelo Disco', 'ms'), --9
	('Escrito pelo Disco', 'ms'), --10
    ('Temperatura da CPU', '°C'), --11
    ('Processos', null), --12
    ('Quantidade de conexões ativas', 'TCP'); --13

CREATE TABLE Parametro (
	fk_Servidor int,
	foreign key (fk_Servidor) references Servidor (idServidor),
	fk_Metrica int,
	foreign key (fk_Metrica) references Metrica (idMetrica)
);

INSERT INTO Parametro 
	VALUES (1,1), (1,2), (1,5), (1,6), (1,7), (1,8), (1,12);

CREATE TABLE Leitura (
	fkServidor int,
	foreign key (fkServidor) references Servidor (idServidor),
	fkMetrica int,
	foreign key (fkMetrica) references Metrica (idMetrica),
	dataLeitura datetime,
	valor_leitura varchar(45),
	situacao char(1) default 'n',
	componente varchar(45),
	primary key (fkServidor, fkMetrica, dataLeitura, componente)
);

CREATE TABLE Processo (
	fkServidor int,
    foreign key (fkServidor) references Servidor(idServidor),
	pid int,
	dataLeitura datetime,
    nome varchar(40),    
    usoCpu decimal(5,2),
    situacaoCpu char(1) DEFAULT 'n',
    usoRam decimal(5,2),
    situacaoRam char(1) DEFAULT 'n',
    primary key (fkServidor, pid, dataLeitura, nome)
);

CREATE TABLE Permissao_Processo (
	idPermissao int primary key identity(1,1),
	nome varchar(40),
	permissao tinyint,
	fkServidor int
	foreign key (fkServidor) references Servidor(idServidor)
);

CREATE TABLE Aplicacao (
	idAplicacao int primary key identity(1,1),
	nome varchar(45),
	enderecoIP varchar(40),
	porta int,
	fkServidor int,
	foreign key (fkServidor) references Servidor(idServidor)
);

CREATE VIEW visaoGeralServidores AS
SELECT
	s.idServidor,
	s.modelo,
	s.so,
	s.enderecoMac,
	(select top 1 valor_leitura from Leitura where fkServidor = s.idServidor and fkMetrica = 2 order by dataLeitura desc) as 'qtdCPU',
	(select top 1 valor_leitura from Leitura where fkServidor = s.idServidor and fkMetrica = 5 order by dataLeitura desc) as 'qtdRAM',
	(select top 1 valor_leitura from Leitura where fkServidor = s.idServidor and fkMetrica = 7 order by dataLeitura desc) as 'qtdDisco',
	(select top 1 dataLeitura from Leitura where fkServidor = s.idServidor order by dataLeitura desc) as 'ultimoRegistro'
FROM Servidor s;

CREATE VIEW leituraCPU as
SELECT
	l.fkMetrica,
	l.dataLeitura as 'horario',
	l.valor_leitura as 'valor',
	l.fkServidor
FROM Leitura as l
WHERE l.fkMetrica = 1;

create view leituraCoreCPU as 
select 
	l.fkMetrica,
    l.dataLeitura as 'horario',
    l.valor_leitura as 'valor',
    l.componente as 'core',
	l.fkServidor
from Leitura as l  
where l.fkMetrica = 3;

create view leituraFreq as 
select 
	l.fkMetrica,
    l.dataLeitura as 'horario',
    l.valor_leitura as 'valor',
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 4;

create view leituraRAM as 
select 
	l.fkMetrica,
    l.dataLeitura as 'horario',
    l.valor_leitura as 'valor',
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 6;

create view leituraDisco as 
select 
	l.fkMetrica,
    l.dataLeitura as 'horario',
    l.valor_leitura as 'valor',
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 8;

create view leituraLDisco as 
select 
	l.fkMetrica,
    l.dataLeitura as 'horario',
    l.valor_leitura as 'valor',
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 9;

create view leituraEDisco as 
select 
	l.fkMetrica,
    l.dataLeitura as 'horario',
    l.valor_leitura as 'valor',
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 10;

create view leituraTemperatura as
select 
	l.fkMetrica,
    l.dataLeitura as 'horario',
    l.valor_leitura as 'valor',
	l.fkServidor
from Leitura as l 
where l.fkMetrica = 11;

create view leituraTCP as
select
	l.fkMetrica,
    l.dataLeitura as 'horario',
    l.valor_leitura as 'valor',
	l.componente as 'enderecoURL',
	l.fkServidor
from Leitura as l
where l.fkMetrica = 13;

CREATE VIEW situacaoLeitura as
select
	l.fkMetrica,
	l.componente,
	(select 
		count(*) 
	from Leitura 
	where Leitura.fkMetrica = l.fkMetrica 
		and Leitura.fkServidor = l.fkServidor 
		and Leitura.situacao = 'a') as 'qtdAvisos',
	(select 
		count(*) 
	from Leitura 
	where Leitura.fkMetrica = l.fkMetrica 
		and Leitura.fkServidor = l.fkServidor 
		and Leitura.situacao = 'e') as 'qtdEmergencias',
	l.fkServidor
from Leitura as l
where l.fkMetrica IN (1,3,4,6,8,9,10,11);

