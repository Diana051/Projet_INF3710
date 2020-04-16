export const data: string = `SET search_path = NETFLIXBD;

INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Aicha', 'Miloudi', 'aicha.miloudi@polymtl.ca', '1234', '8858 rue waverly, Montreal, QC, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Diana', 'Kouakam', 'diana.kouakam@polymtl.ca', '1234', '6817 43 Av, Montreal, QC, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Line', 'Johnson', 'Line.Johnson@polymtl.ca', '1234', '7503 Rue St Denis, montreal, QC, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Geraldine', 'Smith', 'Geraldine.Smith@polymtl.ca', '1234', '170 Lees Ave, Ottawa, ON, CA');

INSERT INTO NETFLIXBD.MembreAbonnementMensuel
	VALUES(1, 9.00,  DATE'2020-01-01', DATE'2020-02-01');
INSERT INTO NETFLIXBD.MembreAbonnementMensuel
	VALUES(2, 9.00,  DATE'2020-03-01', DATE'2020-04-01');
INSERT INTO NETFLIXBD.MembreAbonnementMensuel
	VALUES(3, 13.00,  DATE'2019-10-11', DATE'2020-11-11');
INSERT INTO NETFLIXBD.MembrePayementAVue
	VALUES(4, 4);

INSERT INTO NETFLIXBD.CarteDeCredit VALUES(0000000000000000, 'Aicha Miloudi', DATE'2022-01-01', 123, 1);
INSERT INTO NETFLIXBD.CarteDeCredit VALUES(1111111111111111, 'Diana Kouakam', DATE'2022-02-01', 123, 2);
INSERT INTO NETFLIXBD.CarteDeCredit VALUES(0123456789101112, 'Line Johnson', DATE'2022-10-01', 123, 3);
INSERT INTO NETFLIXBD.CarteDeCredit VALUES(2222222222222222, 'Geraldine Smith', DATE'2022-03-01', 123, 4);

INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction) VALUES('Salt', 'action', 104, DATE'2010-07-18');
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction)
    VALUES('D’abord ils ont tue mon pere', 'Bibliographie', 136, DATE'2017-02-18');
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction) VALUES('inception', 'psycologique', 136, DATE'2017-02-18');
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction) VALUES('iron man', 'superhero', 136, DATE'2017-02-18');
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction) VALUES('terminator', 'action', 136, DATE'2017-02-18');
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction) VALUES('avengers', 'superhero', 136, DATE'2017-02-18');
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction) VALUES('The dark knigth', 'superhero', 136, DATE'2017-02-18');


INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 1,  DATE'2020-01-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(5, 1,  DATE'2020-03-04', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 2,  DATE'2020-01-04', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(2, 3,  DATE'2020-01-23', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 4,  DATE'2020-03-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(2, 4,  DATE'2019-10-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(6, 4,  DATE'2020-04-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 4,  DATE'2019-05-01', 15);


INSERT INTO NETFLIXBD.Participant(nom, prenom, age, sexe)VALUES('Favreau', 'Jon', 53, 'M');
INSERT INTO NETFLIXBD.Participant(nom, prenom, age, sexe)VALUES('Nolan', 'Christopher', 49, 'M');
INSERT INTO NETFLIXBD.Participant(nom, prenom, age, sexe)VALUES('Jolie', 'Angelina', 44, 'F');
INSERT INTO NETFLIXBD.Participant(nom, prenom, age, sexe)VALUES('Cameron', 'James', 65, 'M');
INSERT INTO NETFLIXBD.Participant(nom, prenom, age, sexe)VALUES('Whedon', 'Joss', 55, 'M');
INSERT INTO NETFLIXBD.Participant(nom, prenom, age, sexe)VALUES('Noyce', 'Phillip', 69, 'M');


INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 1, 6);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 2, 3);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 3, 2);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 4, 1);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 5, 4);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 6, 5);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 7, 2);


INSERT INTO NETFLIXBD.CopieDVD VALUES(1, 1, 1, 27.00, DATE'2020-03-28');
INSERT INTO NETFLIXBD.CopieDVD VALUES(2, 1, 1, 27.00, DATE'2020-03-28');
INSERT INTO NETFLIXBD.CopieDVD VALUES(1, 2, 1, 27.00, DATE'2020-03-28');
INSERT INTO NETFLIXBD.CopieDVD VALUES(2, 2, 1, 27.00, DATE'2020-03-28');
--INSERT INTO NETFLIXBD.CopieDVD VALUES(3, 2);
INSERT INTO NETFLIXBD.CopieDVD VALUES(1, 3, 1, 27.00, DATE'2020-03-28');
INSERT INTO NETFLIXBD.CopieDVD VALUES(1, 4, 1, 27.00, DATE'2020-03-28');
;`;
