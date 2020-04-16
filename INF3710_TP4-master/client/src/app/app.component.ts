import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Film } from "../../../common/tables/Film";
import { CommunicationService } from "./communication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public route: string;
    public readonly title: string = "INF3710 TP5";
    public films: Film[] = [];

    public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
        router.events.subscribe((val) => {
            if (location.path() !== "") {
              this.route = location.path();
            } else {
              this.route = "";
            }
          });
    }

    public ngOnInit(): void {
        this.communicationService.listen().subscribe((m:any) => {
            console.log(m);
            this.getFilms();
        });
    }

    public getFilms(): void {
        this.communicationService.getFilms().subscribe((filmsBD: Film[]) => {
            this.films = filmsBD;
        });
    }

    public deleteFilm(): void {
        // TODO
    }

    public createDB(): void {
        this.communicationService.setUpDatabase().subscribe((res: any) => {
            console.log(res);
        });
    }
}