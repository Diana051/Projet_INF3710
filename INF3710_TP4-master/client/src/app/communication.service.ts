import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, of, Observable, Subject} from "rxjs";
import { catchError } from "rxjs/operators";
import { Film, FilmBD, CopiesDVD } from "../../../common/tables/Film";
import { Member, MemberPerView, MemberSubscribe, MemberBD } from "../../../common/tables/Member";
// import { Login } from "../../../common/tables/Login";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();

    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }

    public getFilms(): Observable<FilmBD[]> {

        return this.http.get<FilmBD[]>(this.BASE_URL + "/film").pipe(
            catchError(this.handleError<FilmBD[]>("getFilms")),
        );
    }

    public insertFilm(newFilm: Film): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/administrateur/film/insert", newFilm).pipe(
            catchError(this.handleError<number>("inserFilm")),
        );
    }

    public insertMemberAbonnement(newMember: MemberSubscribe): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/administrateur/memberSubscribe/insert", newMember).pipe(
            catchError(this.handleError<number>("insertMemberSubscribe")),
        );
    }

    public insertMemberPerView(newMember: MemberPerView): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/administrateur/memberPerView/insert", newMember).pipe(
            catchError(this.handleError<number>("inserMemberPerView")),
        );
    }

    public cryptPasseword(newMember: Member): Member {
        /*const bycrpt = require("bycrptjs");
        const salt = bycrpt.genSalt(10);
        const  hash = bycrpt.hash(newMember.passeWord, salt);
        console.log(hash);*/
        return newMember;
    }

    public deleteFilm(film: FilmBD): Observable<FilmBD> {
        return this.http.delete<FilmBD>(this.BASE_URL + "/administrateur/film/delete" + film.filmId).pipe(
            catchError(this.handleError<FilmBD>("deletefilm")),
        );
    }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    public login(login: any): Observable<any> {
        return this.http.post<any>(this.BASE_URL + "/login/newLogin", login).pipe(
            catchError(this.handleError<number>("newLogin")),);
    }

    public getMemberType(memberID: number): Observable<any> {
        return this.http.post<any>(this.BASE_URL + "/login/newLogin/getMemberType", memberID).pipe(
            catchError(this.handleError<number>("newLogin")),);
    }

    public getWatchTime(watch: {userid: string, filmid: string}): Observable<any> {
        return this.http.post<any>(this.BASE_URL + "/watchFilm/getWatchTime", watch).pipe(
            catchError(this.handleError<number>("watchFilm")),);
    }

    public upadeWatchTime(film: {userid: string, filmid: string, watchTime: string}): Observable<any> {
        return this.http.post<any>(this.BASE_URL + "/watchFilm/updateWatchTime", film).pipe(
            catchError(this.handleError<number>("watchFilm")),);
    }

    public buyDVD(film: FilmBD, member: MemberBD): Observable<CopiesDVD> {
        const date: Date = new Date();
        const DVD: CopiesDVD = {
            numeroDVD: '1',
            filmID: film.filmId,
            membreID: member.memberId,
            coutEnvoi: this.triggerEnvoiDVD(member),
            dateEnvoi: date.getDate(),
        }
        return this.http.post<CopiesDVD>(this.BASE_URL + "/buyDVD", DVD).pipe(
            catchError(this.handleError<CopiesDVD>("watchFilm")));
    }

    public triggerEnvoiDVD( member: MemberBD): number {
        return 0;
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }

}
