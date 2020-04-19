import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Film } from "../../../common/tables/Film";
import { Member } from "../../../common/tables/Member";
import {schema} from "../createSchema";
import {data} from "../populateDB";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "postgres",
        database: "NETFLIXPOLY",
        password: "Ai448910",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public constructor() {
        this.pool.connect();
    }
    /*

        METHODES DE DEBUG
    */
    public async createSchema(): Promise<pg.QueryResult> {

        return this.pool.query(schema);
    }

    public async populateDb(): Promise<pg.QueryResult> {

        return this.pool.query(data);
    }

   /* public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT * FROM HOTELDB.${tableName};`);
    }*/

    // FILM
    public async getFilms(): Promise<pg.QueryResult> {

        return this.pool.query('SELECT * FROM NetflixBD.Film;');
    }
    public async getCredential(email: string, password: string ): Promise<pg.QueryResult> {
        return this.pool.query('SELECT * FROM NetflixBD.Membre WHERE adresseCourriel =  \'' + email + '\' and motDePasse = \''+ password +'\';');
    }
    public async getMembreAbonnementMensuel(memberid:number ): Promise<pg.QueryResult> {
        return this.pool.query('SELECT membreid FROM NetflixBD.MembreAbonnementMensuel WHERE membreid =  \'' + memberid +'\';');
    }
    public async getWatchTime(userid: string ,filmid: string ): Promise<pg.QueryResult> {
        return this.pool.query('SELECT dureeDeVisionnement FROM NetflixBD.VisionnementEnLigne WHERE filmID =  ' + filmid + ' AND membreID = ' +userid + ';');
    }
    public async updateWatchTime(userid: string, filmid: string, watchTime:string ): Promise<pg.QueryResult> {
        let query = this.pool.query('SELECT dureeDeVisionnement FROM NetflixBD.VisionnementEnLigne WHERE filmID =  ' + filmid  + ' AND membreID = ' +userid + ';');
        if ((await query).rows.length ==1){
            return this.pool.query('UPDATE NetflixBD.VisionnementEnLigne SET dureeDeVisionnement = ' + watchTime + ' WHERE filmID =  ' + filmid + ' AND membreID = ' +userid + ';');
        }else{
            
            let date = new Date();
            let dd = String(date.getDate()).padStart(2, '0');
            let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = date.getFullYear();
            let today = 'DATE\''+ yyyy +'-'+mm+'-'+dd+'\'';
            return this.pool.query('INSERT INTO NetflixBD.VisionnementEnLigne VALUES(' + filmid+', '+ userid+', '+today+', '+watchTime+');');
        }
    }

    public async createFilm(newFilm: Film): Promise<pg.QueryResult> {
        const values: string[] = [
            newFilm.filmid.toString(),
            newFilm.title,
            newFilm.genre,
            newFilm.duration,
            newFilm.productiondate.toDateString(),
            newFilm.price.toString(),
        ];
        const queryText: string = `INSERT INTO NetflixBD.Film VALUES($1, $2, $3, $4, $5);`;

        return this.pool.query(queryText, values);
    }


    // MEMBER
    public async createMember(newMember: Member): Promise<pg.QueryResult> {
        const values: string[] = [
            newMember.memberid.toString(),
            newMember.lastname,
            newMember.firstname,
            newMember.email,
            newMember.address,
            newMember.password,
        ];
        const queryText: string = `INSERT INTO NetflixBD.Membre VALUES($1,$2,$3,$4,$5,$6);`;

        return this.pool.query(queryText, values);
    }
	
	public deleteFilm(/*Todo*/): void /*TODO*/  {
		/*TODO*/
	}

    /* ROOM
    public async getRoomFromHotel(hotelNo: string, roomType: string, price: number): Promise<pg.QueryResult> {

        let query: string =
        `SELECT * FROM HOTELDB.room
        WHERE hotelno=\'${hotelNo}\'`;
        if (roomType !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`typeroom=\'${roomType}\'`);
        }
        if (price !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`price =\'${price}\'`);
        }
        console.log(query);

        return this.pool.query(query);
    }*/

    /*public async getRoomFromHotelParams(params: object): Promise<pg.QueryResult> {

        let query: string = 'SELECT * FROM HOTELDB.room \n';
        const keys: string[] = Object.keys(params);
        if (keys.length > 0) {
            query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
        }

        // On enleve le premier element
        keys.shift();

        // tslint:disable-next-line:forin
        for (const param in keys) {
            const value: string = keys[param];
            query = query.concat(`AND ${value} = \'${params[value]}\'`);
            if (param === 'price') {
                query = query.replace('\'', '');
            }
        }

        console.log(query);

        return this.pool.query(query);

    }*/
}
