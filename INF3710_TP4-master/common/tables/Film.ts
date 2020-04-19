export interface Film {
    filmid: number, 
    title: string, 
    genre: string,
    duration: string,
    productiondate: Date,
    price: number,
};
export const pushFilms = (rows: any[]): Film[]=>{
    let films:Film[] = new Array;
    rows.forEach(row => {
        films.push({filmid: row.filmid, title: row.titre, genre: row.genre, duration: row.duration, productiondate: row.dateproduction, price: row.prix})
    });
    return films;
}
