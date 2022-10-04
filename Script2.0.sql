CREATE DATABASE safecommerce2;

USE safecommerce2;

create table Empresa(
	idEmpresa int primary key auto_increment,
    nome varchar(45),
    cnpj char(14)
);

create table Usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
	email varchar(45),
	senha varchar(65),
	fkUsuario int,
    foreign key (fkUsuario) references Usuario(idUsuario),
    fkEmpresa int,
    foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table Servidor(
	idServidor int primary key,
    modelo varchar(45),
	so varchar(45),
    enderecoMac varchar(17),
    fkEmpresa int,
    foreign key (fkEmpresa) references Empresa(idEmpresa)
);

create table Metrica(
	idMetrica int primary key auto_increment,
    nome varchar(45),
    unidadeMedida varchar(45),
    formato varchar(45)
);

INSERT INTO Metrica VALUES 
	(null, "Porcentagem de uso da CPU", "%", "Decimal(5,2)"),
	(null, "Quatidade de CPU logica","vCPU", "int"),
	(null, "Porcentagem de uso da CPU por core","%","Decimal(5,2)"),
	(null, "Frequência de uso da CPU", "MHz", "Decimal(5,2)"),
	(null, "Total de Memoria Ram", "GB", "Decimal(4.2)"),
	(null, "Porcentagem de uso da Memoria Ram", "%", "Decimal(5,2)"),
	(null, "Total de Disco", "TB", "Decimal(5,2)"),
	(null, "Porcentagem de uso de Disco", "%", "Decimal(5,2)"),
	(null, "Lido pelo Disco", "ms", "Decimal(5,2)"),
	(null, "Escrito pelo Disco", "ms", "Decimal(5,2)");

select * from Metrica;

create table Parametro(
	fkServidor int,
    foreign key (fkServidor) references Servidor(idServidor),
    fkMetrica int,
    foreign key (fkMetrica) references Metrica(idMetrica)
);

create table Leitura(
	fkServidor int,
    foreign key (fkServidor) references Servidor(idServidor),
    fkMetrica int,
    foreign key (fkMetrica) references Metrica(idMetrica),
	dataLeitura datetime primary key,
    valorLeitura varchar(45),
    componente varchar(45)
    
);

select 
	Usuario.nome as nomeUser, 
	Usuario.email as emailUser, 
	Usuario.senha as senhaUser, 
	Empresa.nome as nomeEmpresa 
from Usuario, Empresa 
where Usuario.email = "admin@Lojas_Americanas.com" 
	and usuario.senha = "admin123" 
	and fkEmpresa = idEmpresa;

create view visualizacaoMensal as 
select 
	month(Leitura.dataLeitura) as "Mês",
	day(Leitura.dataLeitura) as "Dia" ,
	hour(Leitura.dataLeitura) as "Hora",
	Leitura.componente,
	Leitura.valorLeitura,
	Metrica.nome as "Nome métrica",
	Metrica.unidadeMedida,
	Metrica.formato,
	Servidor.idServidor 
from Leitura, Metrica, Servidor 
where Leitura.dataLeitura  between current_date()-30 and current_date() 
and Leitura.fkServidor = Servidor.idServidor 
and Leitura.fkMetrica = Metrica.idMetrica 
ORDER BY Leitura.dataLeitura;

select * from visualizacaoMensal;
drop view visualizacaoMensal;

create view visualizacaoSemanal as 
select
	month(Leitura.dataLeitura) as "Mês" ,
	day(Leitura.dataLeitura) as "Dia" ,
	hour(Leitura.dataLeitura) as "Hora",
	Leitura.componente,
	Metrica.nome as "Nome métrica",
	Leitura.valorLeitura,
	Metrica.unidadeMedida,
	Metrica.formato,
	Servidor.idServidor 
from Leitura, Metrica, Servidor 
where Leitura.dataLeitura  between current_date()-7 and current_date() 
and Leitura.fkServidor = Servidor.idServidor 
and Leitura.fkMetrica = Metrica.idMetrica 
ORDER BY Leitura.dataLeitura;

select * from visualizacaoSemanal;
drop view visualizacaoSemanal;


create view leituraCPU as 
select 
	m.idMetrica,
    l.dataLeitura as "horario",
    l.valorLeitura as "valor",
	s.idServidor
from Leitura as l  
inner join Metrica as m on l.fkMetrica = m.idMetrica
inner join Servidor as s on l.fkServidor = s.idServidor 
where m.idMetrica = 1;

select * from leituraCPU;
drop view leituraCPU;


create view leituraRAM as 
select
	m.idMetrica, 
    hour(l.dataLeitura) as "Hora",
    l.valorLeitura as "valor",
	s.idServidor
from Leitura as l  
inner join Metrica as m on l.fkMetrica = m.idMetrica
inner join Servidor as s on l.fkServidor = s.idServidor 
where m.idMetrica = "5" and m.idMetrica = "6";

select * from leituraRAM;
drop view leituraRAM;


create view leituraDisco as 
select
	m.idMetrica,
    hour(l.dataLeitura) as "Hora",
    l.valorLeitura as "valor",
	s.idServidor
from Leitura as l  
inner join Metrica as m on l.fkMetrica = m.idMetrica
inner join Servidor as s on l.fkServidor = s.idServidor 
where m.idMetrica = "7" and m.idMetrica = "8";

select * from leituraDisco;
drop view leituraDisco;

drop database safecommerce