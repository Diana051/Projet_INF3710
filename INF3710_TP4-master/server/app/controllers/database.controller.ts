import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import {Film,pushFilms} from "../../../common/tables/Film";
import {Member, pushMembers, MemberType} from '../../../common/tables/Member';


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
                    let films:Film[] = new Array;
                    films = pushFilms(result.rows);
                    res.json(films);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
            router.post("/login/newLogin",
                   (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.getCredential(req.body.email, req.body.passWord).then((result: pg.QueryResult) => {
                    
                    let members : Member[] = pushMembers(result.rows);
                    if (result.rows.length == 1){
                        let memberType:MemberType= MemberType.PerView;
                        this.databaseService.getMembreAbonnementMensuel(members[0].memberid).then((result: pg.QueryResult) =>{
                            if(result.rows.length == 1){
                                memberType = MemberType.Subscribtion;
                            }else {
                                memberType = MemberType.PerView
                            }
                        });
                        res.json({access:true, members:members, memberType: memberType});
                    }else {
                        res.json({access:false, members:members});
                    }
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
            router.post("/login/newLogin/getMemberType",
                (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.getMembreAbonnementMensuel(req.body.memberID).then((result: pg.QueryResult) => {
                    
                    let memberType : MemberType
                    if (result.rows.length == 1){
                        memberType = MemberType.Subscribtion;
                        res.json(memberType); 
                    }else {
                        memberType = MemberType.PerView
                        res.json(memberType);
                    }
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
            router.post("/watchFilm/getWatchTime",
                (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.getWatchTime(req.body.userid,req.body.filmid).then((result: pg.QueryResult) => {
                    res.json(result.rows[0].dureedevisionnement);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
            router.post("/watchFilm/updateWatchTime",
                (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.updateWatchTime(req.body.userid, req.body.filmid, req.body.watchTime).then((result: pg.QueryResult) => {
                        res.json(result.rows);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.post("/film/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const newFilm: Film = {
                            filmid: req.body.filmid,
                            title: req.body.title,
                            genre: req.body.genre,
                            duration: req.body.duration,
                            productiondate: req.body.productiondate,
                            price: req.body.price,
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
                        memberid: req.body.memberid,
                        lastname: req.body.lastname,
                        firstname: req.body.firstname,
                        email: req.body.email,
                        address: req.body.address, 
                        password: req.body.password
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
