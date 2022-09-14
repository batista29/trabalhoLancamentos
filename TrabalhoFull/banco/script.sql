drop database if exists lancamentos;
create database lancamentos charset=UTF8 collate utf8_general_ci;
use lancamentos;

create table lancamentos (
    nmr_lancamento integer not null primary key auto_increment,
    data date not null,
    descricao varchar (40) not null,
    valor numeric(6,2) not null,
    tipo varchar (1) not null
);

describe lancamentos;

show tables;

LOAD DATA INFILE 'C:/Users/User/Desktop/trabalho2semestre/TrabalhoFull/csv/lancamentos.csv'
INTO TABLE lancamentos
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

select * from lancamentos;