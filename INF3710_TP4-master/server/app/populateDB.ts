export const data: string = `
SET search_path = NETFLIXBD;

INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('Salt', 'action', 104, DATE'2010-07-18', 5.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('D’abord ils ont tue mon pere', 'Bibliographie', 136, DATE'2017-02-18', 6.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('inception', 'psycologique', 136, DATE'2017-02-18', 7.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('iron man', 'superhero', 136, DATE'2017-02-18', 5.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('Terminator', 'action', 136, DATE'2017-02-18', 6.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('The Avengers', 'superhero', 136, DATE'2017-02-18', 5.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('The dark knigth', 'superhero', 136, DATE'2017-02-18', 5.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('Pieds nus dans laube', 'drame', 136, DATE'2017-02-18', 5.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('Aurore', 'drame', 136, DATE'2017-02-18', 5.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('Annie hall', 'comedie romantique', 136, DATE'1977-04-20', 5.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('Midnight in paris', 'romance', 136, DATE'2011-06-03', 5.00);
INSERT INTO NETFLIXBD.Film(titre, genre, dureeTotale, dateProduction, prix) VALUES('Manhattan', 'comedie romantique', 136, DATE'1979-04-25', 5.00);

INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Aicha', 'Miloudi', 'aicha.miloudi@polymtl.ca', '1234', '8858 rue waverly, Montreal, QC, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Diana', 'Kouakam', 'diana.kouakam@polymtl.ca', '1234', '6817 43 Av, Montreal, QC, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Line', 'Johnson', 'Line.Johnson@polymtl.ca', '1234', '7503 Rue St Denis, montreal, QC, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Geraldine', 'Smith', 'Geraldine.Smith@polymtl.ca', '1234', '170 Lees Ave, Ottawa, ON, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Brian', 'Smith', 'Brian.Smith@polymtl.ca', '1234', '11 Alldread Cres, Newcastle, ON, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Elsie', 'Johnson', 'Elsie.Johnson@polymtl.ca', '1234', '202-10930 53 Ave NW , Edmonton, AB, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Abdollazadeh', 'Toba', 'Abdollazadeh.Toba@polymtl.ca', '1234', '315-8311 142 St NW , Edmonton, AB, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('David', 'Johnson', 'David.Johnson@polymtl.ca', '1234', '2970 Mariner Way 3, Coquitlam, BC, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Daniel', 'Smith', 'Daniel.Smith@polymtl.ca', '1234', '32 Milne N , Amherstburg, ON, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Wes', 'Wes', 'Geraldine.Smith@polymtl.ca', '1234', '17 St Car Denis , Chateauguay, QC, CA');
INSERT INTO NETFLIXBD.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale) 
	VALUES('Abdollazadeh', 'Toba', 'Abdollazadeh.Toba@polymtl.ca', '1234', '2 Rue Du Grenache , Kirkland, QC, CA');

INSERT INTO NETFLIXBD.MembreAbonnementMensuel
	VALUES(1, 9.00,  DATE'2020-01-01', DATE'2020-02-01');
INSERT INTO NETFLIXBD.MembreAbonnementMensuel
	VALUES(2, 9.00,  DATE'2020-03-01', DATE'2020-04-01');
INSERT INTO NETFLIXBD.MembreAbonnementMensuel
	VALUES(3, 13.00,  DATE'2019-10-11', DATE'2020-11-11');
INSERT INTO NETFLIXBD.MembreAbonnementMensuel
	VALUES(5, 13.00,  DATE'2019-10-11', DATE'2020-11-11');
INSERT INTO NETFLIXBD.MembreAbonnementMensuel
	VALUES(6, 13.00,  DATE'2019-10-11', DATE'2020-11-11');
INSERT INTO NETFLIXBD.MembreAbonnementMensuel
	VALUES(7, 13.00,  DATE'2019-10-11', DATE'2020-11-11');
	
INSERT INTO NETFLIXBD.MembrePayementAVue
	VALUES(4, 4);
INSERT INTO NETFLIXBD.MembrePayementAVue
	VALUES(8, 2);
INSERT INTO NETFLIXBD.MembrePayementAVue
	VALUES(9, 2);
INSERT INTO NETFLIXBD.MembrePayementAVue
	VALUES(10, 2);
INSERT INTO NETFLIXBD.MembrePayementAVue
	VALUES(11, 1);

INSERT INTO NETFLIXBD.CarteDeCredit VALUES(0000000000000000, 'Aicha Miloudi', DATE'2022-01-01', 123, 1);
INSERT INTO NETFLIXBD.CarteDeCredit VALUES(1111111111111111, 'Diana Kouakam', DATE'2022-02-01', 123, 2);
INSERT INTO NETFLIXBD.CarteDeCredit VALUES(0123456789101112, 'Line Johnson', DATE'2022-10-01', 123, 3);
INSERT INTO NETFLIXBD.CarteDeCredit VALUES(2222222222222222, 'Geraldine Smith', DATE'2022-03-01', 123, 4);


INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Jon Favreau', DATE'1966-10-19', 'M', 'Americaine');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Christopher Nolan', DATE'1970-07-30', 'M', 'Anglaise');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Angelina Jolie', DATE'1975-06-04', 'F', 'Americaine');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('James Cameron', DATE'1954-08-16', 'M', 'Canadienne');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Joss Whedon',  DATE'1964-06-23', 'M', 'Americaine');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Phillip Noyce', DATE'1950-04-29', 'M', 'Autralienne');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Catherine Senart', DATE'1970-04-17', 'F', 'Quebecoise');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Marianne Fortier', DATE'1993-11-2', 'F', 'Quebecoise');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Helene Bourgeois Leclerc', DATE'1974-04-15', 'F', 'Quebecoise');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Alice Morel-Michaud', DATE'1998-10-31', 'F', 'Quebecoise');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Leonardo DiCaprio', DATE'1974-11-11', 'M', 'Americaine');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Ellen Page', DATE'1987-02-21', 'F', 'Canadienne');
INSERT INTO NETFLIXBD.Participant(nom, dateNaissance, sexe, nationalite)VALUES('Woody Allen', DATE'1935-12-01', 'M', 'Americaine');


INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 1, 6);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 2, 3);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 3, 2);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 4, 1);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 5, 4);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 6, 5);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 7, 2);
INSERT INTO NETFLIXBD.Role VALUES('acteur', 350000, 1, 3);
INSERT INTO NETFLIXBD.Role VALUES('acteur', 350000, 8, 7);
INSERT INTO NETFLIXBD.Role VALUES('acteur', 350000, 8, 8);
INSERT INTO NETFLIXBD.Role VALUES('acteur', 350000, 9, 8);
INSERT INTO NETFLIXBD.Role VALUES('acteur', 350000, 9, 9);
INSERT INTO NETFLIXBD.Role VALUES('acteur', 350000, 9, 10);
INSERT INTO NETFLIXBD.Role VALUES('acteur', 350000, 3, 11);
INSERT INTO NETFLIXBD.Role VALUES('acteur', 350000, 3, 12);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 10, 13);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 11, 13);
INSERT INTO NETFLIXBD.Role VALUES('realisateur', 350000, 12, 13);
INSERT INTO NETFLIXBD.Role VALUES('acteur', 350000, 10, 13);


INSERT INTO NETFLIXBD.CopieDVD VALUES(1, 1, 1, 27.00, DATE'2020-03-28');
INSERT INTO NETFLIXBD.CopieDVD VALUES(2, 1, 2, 27.00, DATE'2020-03-28');
INSERT INTO NETFLIXBD.CopieDVD VALUES(1, 2, 1, 25.00, DATE'2020-03-28');
INSERT INTO NETFLIXBD.CopieDVD VALUES(2, 2, 2, 25.00, DATE'2020-03-28');
INSERT INTO NETFLIXBD.CopieDVD VALUES(3, 2, 3, 25.00, DATE'2020-03-28');
INSERT INTO NETFLIXBD.CopieDVD VALUES(1, 3, 1, 19.00, DATE'2020-03-28');
INSERT INTO NETFLIXBD.CopieDVD VALUES(1, 5, 2, 20.00, DATE'2020-03-28');

INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 1,  DATE'2020-01-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(5, 1,  DATE'2020-03-04', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 2,  DATE'2020-01-04', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(2, 3,  DATE'2020-01-23', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 4,  DATE'2020-03-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(2, 4,  DATE'2019-10-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(6, 4,  DATE'2020-04-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 4,  DATE'2019-05-01', 15);

INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 1,  DATE'2019-05-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 2,  DATE'2019-05-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 3,  DATE'2019-05-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 5,  DATE'2019-05-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 6,  DATE'2019-05-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 7,  DATE'2019-05-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 8,  DATE'2019-05-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 9,  DATE'2019-05-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 10,  DATE'2019-05-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(4, 11,  DATE'2019-05-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 3,  DATE'2020-03-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 5,  DATE'2020-03-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 6,  DATE'2020-03-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 7,  DATE'2020-03-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 8,  DATE'2020-03-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 9,  DATE'2020-03-01', 15);
INSERT INTO NETFLIXBD.VisionnementEnLigne VALUES(1, 10,  DATE'2020-03-01', 15);



INSERT INTO NETFLIXBD.CeremonieOscars(maitre, dateCeremonie, lieu) VALUES( 'James Franco, Anne Hathaway',  DATE'2011-02-27', 'Kodak Theatre, Hollywood, LA');
INSERT INTO NETFLIXBD.CeremonieOscars(maitre, dateCeremonie, lieu) VALUES( 'Hugh Jackman',  DATE'2009-02-22', 'Kodak Theatre, Hollywood, LA');
INSERT INTO NETFLIXBD.CeremonieOscars(maitre, dateCeremonie, lieu) VALUES( 'Jack Lemmon',  DATE'1985-03-25', 'Dorothy Chandler Pavilion, Hollywood, LA');
INSERT INTO NETFLIXBD.CeremonieOscars(maitre, dateCeremonie, lieu) VALUES( 'Seth MacFarlane',  DATE'2013-02-24', 'Dolby Theatre, Hollywood, LA');



INSERT INTO NETFLIXBD.FilmGagant VALUES(2, 7, 1, 'Best Performance by an Actor in a Supporting Role');
INSERT INTO NETFLIXBD.FilmGagant VALUES(2, 7, 2, 'Best Achievement in Sound Editing');
INSERT INTO NETFLIXBD.FilmGagant VALUES(1, 3, 3, 'Best Achievement in Cinematography');
INSERT INTO NETFLIXBD.FilmGagant VALUES(1, 3, 7, 'Best Achievement in Sound Mixing');
INSERT INTO NETFLIXBD.FilmGagant VALUES(1, 3, 2, 'Best Achievement in Sound Editing');
INSERT INTO NETFLIXBD.FilmGagant VALUES(1, 3, 8, 'Best Achievement in Visual Effects');

INSERT INTO NETFLIXBD.FilmGagant VALUES(3, 5, 11, 'Best Writing');
INSERT INTO NETFLIXBD.FilmGagant VALUES(3, 5, 12, 'Best Meke-Up');



INSERT INTO NETFLIXBD.FilmNomine VALUES(1, 1, 7, 'Best Achievement in Sound Mixing');

INSERT INTO NETFLIXBD.FilmNomine VALUES(1, 3, 8, 'Best Motion Picture of the Year');
INSERT INTO NETFLIXBD.FilmNomine VALUES(1, 3, 9, 'Best Writing, Original Screenplay');
INSERT INTO NETFLIXBD.FilmNomine VALUES(1, 3, 10, 'Best Achievement in Music Written for Motion Pictures, Original Score');
INSERT INTO NETFLIXBD.FilmNomine VALUES(1, 3, 5, 'Best Achievement in Art Direction');

INSERT INTO NETFLIXBD.FilmNomine VALUES(2, 4, 2, 'Best Achievement in Sound Editing');
INSERT INTO NETFLIXBD.FilmNomine VALUES(2, 4, 8, 'Best Achievement in Visual Effects');

INSERT INTO NETFLIXBD.FilmNomine VALUES(3, 5, 13, 'Best Actor');
INSERT INTO NETFLIXBD.FilmNomine VALUES(3, 5, 14, 'Best Actress');
INSERT INTO NETFLIXBD.FilmNomine VALUES(3, 5, 15, 'Best Director');
INSERT INTO NETFLIXBD.FilmNomine VALUES(3, 5, 16, 'Best Music');

INSERT INTO NETFLIXBD.FilmNomine VALUES(4, 6, 8, 'Best Achievement in Visual Effects');

INSERT INTO NETFLIXBD.FilmNomine VALUES(2, 7, 3, 'Best Achievement in Cinematography');
INSERT INTO NETFLIXBD.FilmNomine VALUES(2, 7, 4, 'Best Achievement in Film Editing');
INSERT INTO NETFLIXBD.FilmNomine VALUES(2, 7, 5, 'Best Achievement in Art Direction');
INSERT INTO NETFLIXBD.FilmNomine VALUES(2, 7, 6, 'Best Achievement in Makeup');
INSERT INTO NETFLIXBD.FilmNomine VALUES(2, 7, 7, 'Best Achievement in Sound Mixing');
INSERT INTO NETFLIXBD.FilmNomine VALUES(2, 7, 8, 'Best Achievement in Visual Effects');
`;
