import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Film } from "../../../common/tables/Film";
import { Member, MemberPerView, MemberSubscribe } from "../../../common/tables/Member";
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


    public getFilms(): Observable<any[]> {

        return this.http.get<Film[]>(this.BASE_URL + "/film").pipe(
            catchError(this.handleError<Film[]>("getFilms")),
        );
    }

    public getHotelPKs(): Observable<string[]> {

        return this.http.get<string[]>(this.BASE_URL + "/hotel/hotelNo").pipe(
            catchError(this.handleError<string[]>("getHotelPKs")),
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

    public deleteFilm(): void {}

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }
    public login(login: any): Observable<any> {
        return this.http.post<any>(this.BASE_URL + "/login/newLogin", login).pipe(
            catchError(this.handleError<number>("newLogin")),);
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
