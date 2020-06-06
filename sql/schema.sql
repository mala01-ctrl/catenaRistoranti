DROP DATABASE IF EXISTS catenaRistoranti;
CREATE DATABASE catenaRistoranti;
USE catenaRistoranti;

CREATE TABLE regione (
    id_regione INT PRIMARY KEY NOT NULL,
    nome VARCHAR(50) NOT NULL 
);

CREATE TABLE provincia (
    id_provincia VARCHAR(2) PRIMARY KEY NOT NULL,
    nome VARCHAR(50) NOT NULL,
    idRegione INT NOT NULL,
    FOREIGN KEY (idRegione) REFERENCES regione(id_regione)
);

CREATE TABLE comune (
    id_comune INT PRIMARY KEY NOT NULL,
    nome VARCHAR(50) NOT NULL,
    idProvincia VARCHAR(2) NOT NULL,
    FOREIGN KEY (idProvincia) REFERENCES provincia(id_provincia)
);

/*Chiave primaria not null da chiedere*/
CREATE TABLE indirizzo (
    id_indirizzo INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    via VARCHAR(255) NOT NULL,
    num_civico INT NOT NULL,
    cap INT NOT NULL,
    residenza TINYINT(1) NOT NULL,
    idComune INT NOT NULL,
    FOREIGN KEY (idComune) REFERENCES comune(id_comune)
);

CREATE TABLE ristoranti (
    id_ristorante INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL, 
    num_tavoli INT NOT NULL,
    idIndirizzo INT NOT NULL,
    FOREIGN KEY (idIndirizzo) REFERENCES indirizzo(id_indirizzo)
);

CREATE TABLE persona (
    id_persona INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cliente (
    id_cliente INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    password VARCHAR(255) NOT NULL,
    cellulare VARCHAR(15) NOT NULL,
    punti INT
);

CREATE TABLE cliente_indirizzo (
    id_cliente INT NOT NULL,
    id_indirizzo INT NOT NULL,
    PRIMARY KEY (id_cliente, id_indirizzo),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_indirizzo) REFERENCES indirizzo(id_indirizzo)
);

CREATE TABLE feedback (
    id_feedback INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    commento VARCHAR(255),
    numeroStelle INT NOT NULL,
    num_like INT,
    idCliente INT NOT NULL,
    idRistorante INT NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (idRistorante) REFERENCES ristoranti(id_ristorante) 
);

CREATE TABLE ordinazioni (
    id_ordinazione INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    totale_prezzo FLOAT,
    timestamp TIMESTAMP NOT NULL,
    conferma TINYINT(1) NOT NULL,
    evaso TINYINT(1) NOT NULL,
    idCliente INT NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES cliente(id_cliente)
);

CREATE TABLE pasto (
    id_pasto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descrizione VARCHAR(255),
    tipo VARCHAR(50)
);

CREATE TABLE ordinazione_pasto (
    id_ordinazione INT NOT NULL,
    id_pasto INT NOT NULL,
    PRIMARY KEY (id_ordinazione, id_pasto),
    FOREIGN KEY (id_ordinazione) REFERENCES ordinazioni(id_ordinazione),
    FOREIGN KEY (id_pasto) REFERENCES pasto(id_pasto)
);



