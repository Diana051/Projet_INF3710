import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Film } from "../../../common/tables/Film";
import { Member } from "../../../common/tables/Member";

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
        return this.http.post<number>(this.BASE_URL + "/film/insert", newFilm).pipe(
            catchError(this.handleError<number>("inserFilm")),
        );
    }

    public insertMember(newMember: Member): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/member/insert", newMember).pipe(
            catchError(this.handleError<number>("inserMember")),
        );
    }

    public deleteFilm(): void {}

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
