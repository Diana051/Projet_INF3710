export const schema: string = `
SET search_path = NETFLIXBD;

DROP SCHEMA IF EXISTS NETFLIXBD CASCADE;
CREATE SCHEMA NETFLIXBD;

CREATE DOMAIN NETFLIXBD.Sexe as VARCHAR(1)
	CHECK(VALUE IN ( 'M', 'F'));

CREATE TABLE IF NOT EXISTS NETFLIXBD.Membre(
	membreID SERIAL UNIQUE,
	nom VARCHAR(50) NOT NULL,
	prenom VARCHAR(50) NOT NULL,
	adresseCourriel VARCHAR(70) NOT NULL,
	motDePasse VARCHAR(50) NOT NULL, -- doit être caché
	adressePostale VARCHAR(50) NOT NULL,
	PRIMARY KEY (membreID)
);

CREATE TABLE IF NOT EXISTS NETFLIXBD.MembrePayementAVue(
	membreID INTEGER NOT NULL,
	film_payperview NUMERIC(16,0) NOT NULL,
	PRIMARY KEY (membreID),
	FOREIGN KEY (membreID) REFERENCES NETFLIXBD.Membre(membreID) ON DELETE RESTRICT ON UPDATE CASCADE
); 

CREATE TABLE IF NOT EXISTS NETFLIXBD.MembreAbonnementMensuel(
	membreID INTEGER NOT NULL,
	prixAbonnement decimal(5,2) NOT NULL,
	dateDebut DATE NOT NULL,
	echeance DATE NOT NULL,
	PRIMARY KEY (membreID),
	FOREIGN KEY (membreID) REFERENCES NETFLIXBD.Membre(membreID) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS NETFLIXBD.CarteDeCredit(
	numeroCarte NUMERIC(16,0) NOT NULL,
	titulaire VARCHAR(50) NOT NULL, -- Membre
	dateExpiration DATE NOT NULL,
	CVV NUMERIC(3,0) NOT NULL,
	membreID integer NOT NULL,
	PRIMARY KEY (numeroCarte),
	FOREIGN KEY (membreID) REFERENCES NETFLIXBD.Membre(membreID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS NETFLIXBD.Film(
	filmID SERIAL UNIQUE,
	titre VARCHAR(50) NOT NULL,
	genre VARCHAR(50) NOT NULL,
	dureeTotale NUMERIC(4,0) NOT NULL,
	dateProduction DATE NOT NULL,
	prix  decimal(5,2) NOT NULL,
	PRIMARY KEY (filmID)
);

CREATE TABLE IF NOT EXISTS NETFLIXBD.Participant(
	participantID SERIAL UNIQUE,
	nom VARCHAR(50) NOT NULL,
	dateNaissance DATE NOT NULL,
	sexe NETFLIXBD.Sexe NOT NULL,
	nationalite VARCHAR(50) NOT NULL,
	PRIMARY KEY (participantID)
);

CREATE TABLE IF NOT EXISTS NETFLIXBD.CeremonieOscars(
	ceremonieID SERIAL UNIQUE,
	maitre VARCHAR(50) NOT NULL,
	dateCeremonie DATE NOT NULL,
	lieu VARCHAR(50) NOT NULL,
	PRIMARY KEY (ceremonieID)
);

CREATE TABLE IF NOT EXISTS NETFLIXBD.Role(
	nomRole VARCHAR(50) NOT NULL,
	salaire integer NOT NULL,
	filmID integer NOT NULL,
	participantID integer NOT NULL,
	PRIMARY KEY(participantID, filmID, nomRole),
	FOREIGN KEY (participantID) REFERENCES NETFLIXBD.Participant(participantID),
	FOREIGN KEY (filmID) REFERENCES NETFLIXBD.Film(filmID)
);

CREATE TABLE IF NOT EXISTS NETFLIXBD.CopieDVD(
	numeroDVD NUMERIC(4,0) NOT NULL,
	filmID integer NOT NULL,
	membreID integer NOT NULL,
	coutEnvoi  decimal(5,2) NOT NULL,
	dateEnvoi Date NOT NULL,
	PRIMARY KEY (numeroDVD, membreID, filmID),
	FOREIGN KEY (membreID) REFERENCES NETFLIXBD.Membre(membreID),
	FOREIGN KEY (filmID) REFERENCES NETFLIXBD.Film(filmID)
);

CREATE TABLE IF NOT EXISTS NETFLIXBD.FilmGagant(
	ceremonieID integer NOT NULL,
	filmID integer NOT NULL,
	categorieID integer NOT NULL,
	categorie VARCHAR(100) NOT NULL,
	PRIMARY KEY(ceremonieID, filmID, categorieID),
	FOREIGN KEY (ceremonieID) REFERENCES NETFLIXBD.CeremonieOscars(ceremonieID),
	FOREIGN KEY (filmID) REFERENCES NETFLIXBD.Film(filmID)
);

CREATE TABLE IF NOT EXISTS NETFLIXBD.FilmNomine(
	ceremonieID integer NOT NULL,
	filmID integer NOT NULL,
	categorieID integer NOT NULL,
	categorie VARCHAR(100) NOT NULL,
	PRIMARY KEY(ceremonieID, filmID, categorieID),
	FOREIGN KEY (ceremonieID) REFERENCES NETFLIXBD.CeremonieOscars(ceremonieID),
	FOREIGN KEY (filmID) REFERENCES NETFLIXBD.Film(filmID)
);

CREATE TABLE IF NOT EXISTS NETFLIXBD.VisionnementEnLigne(
	filmID integer NOT NULL,
	membreID integer NOT NULL,
	dateDeVisionnement DATE NOT NULL,
	dureeDeVisionnement integer NOT NULL,
	PRIMARY KEY(membreID, filmID),
	FOREIGN KEY (membreID) REFERENCES NETFLIXBD.Membre(membreID),
	FOREIGN KEY (filmID) REFERENCES NETFLIXBD.Film(filmID)
);
`;
