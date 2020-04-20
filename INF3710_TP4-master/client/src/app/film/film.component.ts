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
  public infoButtonValue: number = 0;

  public constructor(private communicationService: CommunicationService) {
    this.listFilm  = new Array<FilmBD>();
  }

  public ngOnInit(): void {}

  public insertFilm(title: string, gender: string, duration: string, productionDate: Date, price: number): void {
    const newFilm: Film = {
      "title": title,
      "gender": gender,
      "duration": duration,
      "productionDate": productionDate,
      "price": price,
    };
    this.communicationService.insertFilm(newFilm).subscribe((res: number) => {
        console.log(res);
    });
  }

  public openListFilm(): void {
   this.communicationService.getFilms().subscribe((films: FilmBD[]) => {
      this.listFilm = films;
   });
  }

  public showInfo(i: number): void {
    if (i + 1 === this.infoButtonValue ) {
      this.infoButtonValue = 0;
      return;
    }
    this.infoButtonValue = i + 1 ;
  }

  public deleteFilm(film: FilmBD): void {
    console.log(film);
    this.communicationService.deleteFilm(film).subscribe((res: FilmBD) => {
      console.log(res);
      this.openListFilm();
  });
  }

  public editFilm(film: FilmBD): void {
    // this.communicationService.deleteFilm(film);
  }
}
