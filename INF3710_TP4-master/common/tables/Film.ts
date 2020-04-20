export interface Film {
    title: string, 
    gender: string,
    duration: string,
    productionDate: Date,
    price: number
}

export interface FilmBD {
    filmId: number, 
    title: string, 
    gender: string,
    duration: string,
    productionDate: Date,
    price: number
};

export interface CopiesDVD {
    numeroDVD: string,
	filmID: number,
	membreID: number,
	coutEnvoi: number,
	dateEnvoi: number
};

export const pushFilms = (rows: any[]): FilmBD[]=>{
    let films:FilmBD[] = new Array;
    rows.forEach(row => {
        films.push({filmId: row.filmid, title: row.titre, gender: row.genre, duration: row.duration, productionDate: row.dateproduction, price: row.prix})
    });
    return films;
}
