import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Film, FilmBD, pushFilms, CopiesDVD } from "../../../common/tables/Film";
import { pushMembers, Member, MemberBD, MemberPerView, MemberSubscribe } from "../../../common/tables/Member";
import {schema} from "../createSchema";
import {data} from "../populateDB";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "postgres",
        database: "NETFLIXPOLY",
        password: "diana051",
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

        return this.pool.query('SELECT * FROM NETFLIXPOLY.Film;');
    }

    public async getCredential(email: string, password: string ): Promise<pg.QueryResult> {

        return this.pool.query('SELECT * FROM NETFLIXPOLY.Membre WHERE adresseCourriel =  \'' + email + '\' and motDePasse = \''
                                + password + '\';');
    }

    public async getMembreAbonnementMensuel(memberid: number ): Promise<pg.QueryResult> {

        return this.pool.query('SELECT membreid FROM NETFLIXPOLY.MembreAbonnementMensuel WHERE membreid =  \'' + memberid
                                + '\';');
    }

    public async getWatchTime(userid: string , filmid: string ): Promise<pg.QueryResult> {

        return this.pool.query('SELECT dureeDeVisionnement FROM NETFLIXPOLY.VisionnementEnLigne WHERE filmID =  ' + filmid
                                + ' AND membreID = ' + userid + ';');
    }

    public async updateWatchTime(userid: string, filmid: string, watchTime: string ): Promise<pg.QueryResult> {

        let query = this.pool.query('SELECT dureeDeVisionnement FROM NETFLIXPOLY.VisionnementEnLigne WHERE filmID =  '
                                    + filmid  + ' AND membreID = ' + userid + ';');
        if ((await query).rows.length === 1) {
            return this.pool.query('UPDATE NETFLIXPOLY.VisionnementEnLigne SET dureeDeVisionnement = '
                                    + watchTime + ' WHERE filmID =  ' + filmid + ' AND membreID = ' + userid + ';');
        } else {
            const date: Date = new Date();
            const dd: string = String(date.getDate()).padStart(2, '0');
            const mm: string = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy: number = date.getFullYear();
            const today: string = 'DATE\'' + yyyy + '-' + mm + '-' + dd + '\'';
            return this.pool.query('INSERT INTO NETFLIXPOLY.VisionnementEnLigne VALUES(' + filmid + ', ' + userid + ', '
                                    + today + ', ' + watchTime + ');');
        }
    }

    public async createFilm(newFilm: Film): Promise<pg.QueryResult> {
        let films: FilmBD[] = [];

        await this.getFilms().then((result: pg.QueryResult) => {
            films = pushFilms(result.rows);
        });

        const values: string[] = [
            films.length.toString(),
            newFilm.title,
            newFilm.gender,
            newFilm.duration.toString(),
            newFilm.productionDate.toString()
        ];
        const queryText: string = `INSERT INTO NETFLIXPOLY.Film VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
    }

    public async sendDVD(DVD: CopiesDVD): Promise<pg.QueryResult> {

        const values: string[] = [
            DVD.numeroDVD.toString(),
            DVD.filmID.toString(),
            DVD.membreID.toString(),
            DVD.coutEnvoi.toString(),
            DVD.dateEnvoi.toString(),
        ];
        const queryText: string = `INSERT INTO NETFLIXPOLY.CopieDVD VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
    }

    // MEMBER
    public async createMember(newMember: Member): Promise<pg.QueryResult> {
        return this.pool.query('INSERT INTO NETFLIXPOLY.Membre(nom, prenom, adresseCourriel, motDePasse, adressePostale)' +
         'VALUES(' + newMember.lastName + ',' +
        newMember.firstName + ',' +  newMember.email + ',' + newMember.address + ',' + newMember.password + ');');
    }

    public async getMember(): Promise<pg.QueryResult> {
        return this.pool.query('SELECT * FROM NETFLIXPOLY.Member;');
    }

    public async createMemberSubscribe(newMember: MemberSubscribe): Promise<pg.QueryResult> {
        await this.createMember(newMember.member).then((value) => {
            console.log(value);
        }).catch((e: Error) => { console.log(e); });

        let members: MemberBD[] = new Array;
        let id: number = 0;
        await this.getMember().then((result: pg.QueryResult) => {
            members = pushMembers(result.rows);
        });
        for (const member of members) {
            if (member.firstName === newMember.member.firstName &&
                member.lastName === newMember.member.lastName &&
                member.email === newMember.member.email &&
                member.password === newMember.member.password &&
                member.address === newMember.member.address) {
                    id = member.memberId;
                    break;
                }
        }
        const values: string[] = [
            id.toString(),
            newMember.membershipprice.toString(),
            newMember.startDate.toDateString(),
            newMember.deadline.toDateString()
        ];
        const queryText: string = `INSERT INTO NETFLIXPOLY.MembreAbonnementMensuel VALUES($1,$2,$3,$4);`;

        return this.pool.query(queryText, values);
    }

    public async createMemberPerView(newMember: MemberPerView): Promise<pg.QueryResult> {
        await this.createMember(newMember.member).then((value) => {
            console.log(value);
        }).catch((e: Error) => {
            console.error(e.stack);
        });
        let members: MemberBD[] = new Array;
        let id: number = 0;
        await this.getMember().then((result: pg.QueryResult) => {
            members = pushMembers(result.rows);
        });
        for (const member of members) {
            if (member.firstName === newMember.member.firstName &&
                member.lastName === newMember.member.lastName &&
                member.email === newMember.member.email &&
                member.password === newMember.member.password &&
                member.address === newMember.member.address) {
                    id = member.memberId;
                    break;
                }
        }
        const values: string[] = [
             id.toString(),
             newMember.film_payperview.toString(),
         ];
        const queryText: string = `INSERT INTO NETFLIXPOLY.MembrePayementAVue VALUES($1,$2);`;

        return this.pool.query(queryText, values);
    }

    public async deleteFilm(id: string): Promise<pg.QueryResult> {
        const values: string[] = [
            id.toString(),
        ];
        const queryText: string = `DELETE FROM NETFLIXPOLY.Film WHERE filmID = $1;`;
        return this.pool.query(queryText, values);
        // return this.pool.query( 'DELETE FROM NETFLIXPOLY.Film WHERE filmID =' + id + ';');
    }
}
