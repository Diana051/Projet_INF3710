import { Component, OnInit } from "@angular/core";
import { Film, FilmBD } from "../../../../common/tables/Film";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-film",
  templateUrl: "./film.component.html",
  styleUrls: ["./film.component.css"]
})
export class FilmComponent implements OnInit {
  public listFilm: FilmBD[] ;

  public constructor(private communicationService: CommunicationService) {
    this. listFilm  = new Array<FilmBD>();
  }

  public ngOnInit(): void {
  }

  public insertFilm(title: string, gender: string, duration: string, productionDate: Date): void {
    const newFilm: Film = {
      "title": title,
      "gender": gender,
      "duration": duration,
      "productionDate": productionDate
    };
    this.communicationService.insertFilm(newFilm).subscribe((res: number) => {
        console.log(res);
    });
  }

  public openListFilm(): void {
   this.communicationService.getFilms().subscribe((films) => {
    for (const film of films) {
      this.listFilm.push(film);
    }
   });
  }

  public deleteFilm(film: FilmBD): void {
    this.communicationService.deleteFilm(film.filmID);
  }

  public editFilm(film: FilmBD): void {
    // this.communicationService.deleteFilm(film.filmID);
  }
}
