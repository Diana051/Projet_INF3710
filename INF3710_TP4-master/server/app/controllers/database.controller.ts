import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import {pushFilms, Film, FilmBD, CopiesDVD} from "../../../common/tables/Film";
import {pushMembers, MemberBD, MemberPerView, MemberSubscribe, MemberType} from '../../../common/tables/Member';
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
                    let films: FilmBD[] = new Array;
                    films = pushFilms(result.rows);
                    res.json(films);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/login/newLogin",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.getCredential(req.body.email, req.body.passWord).then((result: pg.QueryResult) => {
                        let members : MemberBD[] = pushMembers(result.rows);
                        if (result.rows.length === 1) {
                            let memberType: MemberType = MemberType.PerView;
                            this.databaseService.getMembreAbonnementMensuel(members[0].memberId).then((result: pg.QueryResult) => {
                                if (result.rows.length == 1) {
                                    memberType = MemberType.Subscribtion;
                                } else {
                                    memberType = MemberType.PerView
                                }
                            });
                            res.json({access: true, members: members, memberType: memberType});
                        } else {
                        res.json({access: false, members: members});
                    }
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/login/newLogin/getMemberType",
                    (req: Request, res: Response, next: NextFunction) => {
                        this.databaseService.getMembreAbonnementMensuel(req.body.memberID).then((result: pg.QueryResult) => {
                            let memberType: MemberType;
                            if (result.rows.length === 1) {
                                memberType = MemberType.Subscribtion;
                                res.json(memberType);
                            } else {
                                memberType = MemberType.PerView;
                                res.json(memberType);
                            }
                        }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/watchFilm/getWatchTime",
                    (req: Request, res: Response, next: NextFunction) => {
                        this.databaseService.getWatchTime(req.body.userid, req.body.filmid).then((result: pg.QueryResult) => {
                        res.json(result.rows[0].dureedevisionnement);
                    }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/watchFilm/updateWatchTime",
                    (req: Request, res: Response, next: NextFunction) => {
                        this.databaseService.updateWatchTime(req.body.userid, req.body.filmid, req.body.watchTime
                            ).then((result: pg.QueryResult) => {
                                res.json(result.rows);
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
                            productionDate: req.body.productionDate,
                            price: req.body.price,
                        };
                        this.databaseService.createFilm(newFilm).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.post("/buyDVD",
                    (req: Request, res: Response, next: NextFunction) => {
                        const DVD: CopiesDVD = {
                            numeroDVD: '1',
                            filmID: req.body.filmID,
                            membreID: req.body.memberID,
                            coutEnvoi: req.body.coutEnvoi,
                            dateEnvoi: req.body.dateEnvoi,
                        };
                        this.databaseService.sendDVD(DVD).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
        });

        router.delete("/administrateur/film/delete/:id",
                      (req: Request, res: Response, next: NextFunction) => {
                          this.databaseService.deleteFilm(req.params.id).then((result: pg.QueryResult) => {
                            res.json(result.rowCount);
                        }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
            });

        router.post("/administrateur/memberSubscribe/insert",
                    (req: Request, res: Response, next: NextFunction) => {

                    const member: MemberSubscribe = {
                        member: req.body.member,
                        membershipprice: req.body.membershipprice,
                        startDate: req.body.startDate,
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
            });

        router.post("/administrateur/memberPerView/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const member: MemberPerView = {
                            member: req.body.member,
                            film_payperview: req.body.film_payperview
                            };

                        this.databaseService.createMemberPerView(member)
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
