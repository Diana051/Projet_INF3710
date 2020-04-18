import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import {Film} from "../../../common/tables/Film";
import {Member} from '../../../common/tables/Member';

import {Login} from '../../../common/tables/Login';

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.createSchema().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
        });

        router.get("/film",
                   (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.getFilms().then((result: pg.QueryResult) => {
                    const films: Film[] = result.rows.map((film: Film) => (
                        {
                        filmID: film.filmID,
                        title: film.title,
                        gender: film.gender,
                        duration: film.duration,
                        productionDate: film.productionDate
                    }));
                    console.log(films);
                    res.json(films);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
            router.post("/login/newLogin",
                   (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.getCredential(req.body.email, req.body.passWord).then((result: pg.QueryResult) => {
                    

                        
                    const logins: Login[] = result.rows.map((login: Login) => (
                        {
                        email: login.email,
                        passWord: login.passWord,
                    }));
                    if (logins.length == 1){
                    res.json(true);

                    }else {
                        res.json(false);
                    }
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/film/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const newFilm: Film = {
                            filmID: req.body.filmID,
                            title: req.body.title,
                            gender: req.body.gender,
                            duration: req.body.duration,
                            productionDate: req.body.productionDate
                        };
                        this.databaseService.createFilm(newFilm).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.delete("/film/delete", /*TODO*/);

        router.post("/member/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                    const newMember: Member = {
                        memberID: req.body.memberID,
                        name: req.body.name,
                        firstName: req.body.firstName,
                        email: req.body.email,
                        address: req.body.address, 
                        passeWord: req.body.passeWord
                        };

                    this.databaseService.createMember(newMember)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    })
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        return router;
    }
}
