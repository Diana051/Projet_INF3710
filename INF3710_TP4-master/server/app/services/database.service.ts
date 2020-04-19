import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Film } from "../../../common/tables/Film";
import { Member, MemberSubscribe, MemberPerView } from "../../../common/tables/Member";
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
        return this.pool.query('SELECT adresseCourriel, motDePasse FROM NetflixBD.Membre WHERE adresseCourriel =  \'' + email + '\' and motDePasse = \''+ password +'\';');
    }

    public async createFilm(newFilm: Film): Promise<pg.QueryResult> {
        const values: string[] = [
            newFilm.title,
            newFilm.gender,
            newFilm.duration,
            newFilm.productionDate.toDateString(),
        ];
        const queryText: string = `INSERT INTO NetflixBD.Film VALUES($1, $2, $3, $4);`;

        return this.pool.query(queryText, values);
    }

    // MEMBER
    public async createMember(newMember: Member): Promise<pg.QueryResult> {
        const values: string[] = [
            newMember.name,
            newMember.firstName,
            newMember.email,
            newMember.address,
            newMember.passeWord,
        ];
        const queryText: string = `INSERT INTO NetflixBD.Membre VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
    }

    public async createMemberSubscribe(newMember: MemberSubscribe): Promise<pg.QueryResult> {
       const id = this.pool.query('SELECT membreID FROM NetflixBD.Member WHERE ;');
        const values: string[] = [
            id.toString(),
            newMember.SubscribePrice.toString(),
            newMember.startDate.toDateString(),
            newMember.deadline.toDateString()
        ];
        const queryText: string = `INSERT INTO NetflixBD.MembreAbonnementMensuel VALUES($1,$2,$3,$4);`;

        return this.pool.query(queryText, values);
    }

    public async createMemberPerView(newMember: MemberPerView): Promise<pg.QueryResult> {
        const id = this.pool.query('SELECT membreID FROM NetflixBD.Member WHERE ;');
         const values: string[] = [
             id.toString(),
             newMember.pricePerView.toString(),
         ];
         const queryText: string = `INSERT INTO NETFLIXBD.MembrePayementAVue VALUES($1,$2);`;
 
         return this.pool.query(queryText, values);
     }
	
	public deleteFilm(id: number): Promise<pg.QueryResult>  {
        /*TODO*/
        const values: string[] = [
        ];
        const queryText: string = ``;
        return this.pool.query(queryText, values);
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
