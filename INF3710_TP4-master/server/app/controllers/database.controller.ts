import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import {Film, FilmBD} from "../../../common/tables/Film";
import {Member, MemberSubscribe, MemberPerView} from '../../../common/tables/Member';

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
                    const films: FilmBD[] = result.rows.map((film: FilmBD) => (
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

        router.post("/administrateur/film/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const newFilm: Film = {
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

        router.delete("/administrateur/film/delete", 
            (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.deleteFilm(req.params.id).then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            }).catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });

        router.post("/administrateur/memberSubscribe/insert",
                    (req: Request, res: Response, next: NextFunction) => {

                   const newMember: Member = {
                        name: req.body.member.name,
                        firstName: req.body.member.firstName,
                        email: req.body.member.email,
                        address: req.body.member.address, 
                        passeWord: req.body.member.passeWord
                        }; 
                    const member: MemberSubscribe = {
                        member: newMember,
                        SubscribePrice: req.body.SubscribePrice,
                        startDate: req.body.startDate ,
                        deadline: req.body.deadline
                        };

                    this.databaseService.createMemberSubscribe(member)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    })
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });

                    this.databaseService.createMember(newMember)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    })
                    .catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.post("/administrateur/memberPerView/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const newMember: Member = {
                            name: req.body.member.name,
                            firstName: req.body.member.firstName,
                            email: req.body.member.email,
                            address: req.body.member.address, 
                            passeWord: req.body.member.passeWord
                            }; 
                        const member: MemberPerView = {
                            member: newMember,
                            pricePerView: req.body.pricePerView
                            };
    
                        this.databaseService.createMemberPerView(member)
                        .then((result: pg.QueryResult) => {
                            res.json(result.rowCount);
                        })
                        .catch((e: Error) => {
                            console.error(e.stack);
                            res.json(-1);
                        });
    
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
