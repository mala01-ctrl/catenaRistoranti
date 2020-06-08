INSERT INTO indirizzo(id_indirizzo, via, num_civico, cap, residenza, idComune) 
VALUES ('1', 'dei cimatori', '23', '50122', '0', '48017'), 
('2','Piazza di Madonna Degli Aldobrandini', '3', '50123', '0', '48017'),
('3', 'Provinciale', '38', '50037', '0', '48053');

INSERT INTO ristoranti(id_ristorante, nome, num_tavoli, idIndirizzo)
VALUES('1', 'Girone dei ghiotti', '70', '1'),
('2', 'Brandolino', '80', '2'),
('3', 'La bisboccina', '75', '3');
