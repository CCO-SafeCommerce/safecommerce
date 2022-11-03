CREATE DATABASE safecommerce;

USE safecommerce;

create table Empresa(
	idEmpresa int primary key auto_increment,
    nome varchar(45),
    cnpj char(14) unique
);

create table Usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
	email varchar(45),
	senha varchar(65) unique,
	fkUsuario int,
    foreign key (fkUsuario) references Usuario(idUsuario),
    fkEmpresa int,
    foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table Servidor(
	idServidor int primary key auto_increment,
    modelo varchar(45),
	so varchar(45),
    enderecoMac varchar(17) unique,
    fkEmpresa int,
    foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table Metrica(
	idMetrica int primary key auto_increment,
    nome varchar(45),
    unidadeMedida varchar(45)
);

INSERT INTO Metrica VALUES 
	(null, "Porcentagem de uso da CPU", "%"),
	(null, "Quatidade de CPU logica","vCPU"),
	(null, "Porcentagem de uso da CPU por core","%"),
	(null, "Frequência de uso da CPU", "MHz"),
	(null, "Total de Memoria RAM", "GB"),
	(null, "Porcentagem de uso da Memoria RAM", "%"),
	(null, "Total de Disco", "GB"),
	(null, "Porcentagem de uso de Disco", "%"),
	(null, "Lido pelo Disco", "ms"),
	(null, "Escrito pelo Disco", "ms");

select * from Metrica;

create table Parametro(
	fk_Servidor int,
    foreign key (fk_Servidor) references Servidor(idServidor),
    fk_Metrica int,
    foreign key (fk_Metrica) references Metrica(idMetrica)
);

create table Leitura(
	fkServidor int,
    foreign key (fkServidor) references Servidor(idServidor),
    fkMetrica int,
    foreign key (fkMetrica) references Metrica(idMetrica),
	dataLeitura datetime,
    valor_leitura varchar(45),
    componente varchar(45),
    primary key (fkServidor, fkMetrica, dataLeitura, componente)
);

create view visualizacaoMensal as 
select 
	month(Leitura.dataLeitura) as "mes",
	day(Leitura.dataLeitura) as "dia" ,
	hour(Leitura.dataLeitura) as "hora",
	Leitura.componente,
	Leitura.valor_leitura,
	Metrica.nome as "nome",
	Metrica.unidadeMedida,
	Servidor.idServidor 
from Leitura, Metrica, Servidor 
where Leitura.dataLeitura  between current_date()-30 and current_date() 
and Leitura.fkServidor = Servidor.idServidor 
and Leitura.fkMetrica = Metrica.idMetrica 
ORDER BY Leitura.dataLeitura;
select * from visualizacaoMensal;

create view visualizacaoSemanal as 
select
	month(Leitura.dataLeitura) as "mes" ,
	day(Leitura.dataLeitura) as "dia" ,
	hour(Leitura.dataLeitura) as "hora",
	Leitura.componente,
	Metrica.nome as "nome",
	Leitura.valor_leitura,
	Metrica.unidadeMedida,
	Servidor.idServidor 
from Leitura, Metrica, Servidor 
where Leitura.dataLeitura  between current_date()-7 and current_date() 
and Leitura.fkServidor = Servidor.idServidor 
and Leitura.fkMetrica = Metrica.idMetrica 
ORDER BY Leitura.dataLeitura;
select * from visualizacaoSemanal;

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

select * from visaoGeralServidores;

create view leituraCPU as 
select 
	m.idMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	s.idServidor
from Leitura as l  
inner join Metrica as m on l.fkMetrica = m.idMetrica
inner join Servidor as s on l.fkServidor = s.idServidor 
where m.idMetrica = 1 and m.idMetrica = 1;
select * from leituraCPU;


create view leituraCoreCPU as 
select 
	m.idMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	s.idServidor
from Leitura as l  
inner join Metrica as m on l.fkMetrica = m.idMetrica
inner join Servidor as s on l.fkServidor = s.idServidor 
where m.idMetrica = 3 and m.idMetrica = 3;
select * from leituraCoreCPU;


create view leituraFreq as 
select
	m.idMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	s.idServidor
from Leitura as l  
inner join Metrica as m on l.fkMetrica = m.idMetrica
inner join Servidor as s on l.fkServidor = s.idServidor 
where m.idMetrica = 4 and m.idMetrica = 4;
select * from leituraFreq;


create view leituraRAM as 
select
	m.idMetrica, 
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	s.idServidor
from Leitura as l  
inner join Metrica as m on l.fkMetrica = m.idMetrica
inner join Servidor as s on l.fkServidor = s.idServidor 
where m.idMetrica = 6 and m.idMetrica = 6;
select * from leituraRAM;


create view leituraDisco as 
select
	m.idMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	s.idServidor
from Leitura as l  
inner join Metrica as m on l.fkMetrica = m.idMetrica
inner join Servidor as s on l.fkServidor = s.idServidor 
where m.idMetrica = 8 and m.idMetrica = 8;
select * from leituraDisco;

create view leituraLDisco as 
select
	m.idMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	s.idServidor
from Leitura as l  
inner join Metrica as m on l.fkMetrica = m.idMetrica
inner join Servidor as s on l.fkServidor = s.idServidor 
where m.idMetrica = 9 and m.idMetrica = 9;
select * from leituraLDisco;


create view leituraEDisco as 
select
	m.idMetrica,
    l.dataLeitura as "horario",
    l.valor_leitura as "valor",
	s.idServidor
from Leitura as l  
inner join Metrica as m on l.fkMetrica = m.idMetrica
inner join Servidor as s on l.fkServidor = s.idServidor 
where m.idMetrica = 10 and m.idMetrica = 10;
select * from leituraEDisco;


select * from Parametro;
select * from Servidor;
select * from Leitura;
select * from Metrica;
select * from Usuario;


INSERT INTO Empresa VALUES(null, "SafeCommerce", "02302100000106");
INSERT INTO Usuario VALUES (null, "Gabriel","gabriel@duarte.com","gabriel123",null,1);
INSERT INTO Servidor VALUES (null, "Servidor Exemplo", "Linux", "98:83:89:EC:DB:2C",1);

SELECT * FROM Usuario;
SELECT * FROM Parametro;
insert into Parametro values (1, 1);
INSERT INTO Parametro VALUES (1, 2);
insert into Parametro values (1, 3);
insert into Parametro values (1, 4);
insert into Parametro values (1, 5);
insert into Parametro values (1, 6);
insert into Parametro values (1, 7);
insert into Parametro values (1, 8);
-- Configurar para o java carregar o csv
SET GLOBAL local_infile=1;
SHOW GLOBAL VARIABLES LIKE 'local_infile';