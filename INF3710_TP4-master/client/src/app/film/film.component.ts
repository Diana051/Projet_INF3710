import { Component, OnInit } from "@angular/core";
import { Film } from "../../../../common/tables/Film";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-film",
  templateUrl: "./film.component.html",
  styleUrls: ["./film.component.css"]
})
export class FilmComponent implements OnInit {
  public constructor(private communicationService: CommunicationService) { }

  public hotelPKs: string[] = [];
  public duplicateError: boolean = false;
  public invalidHotelPK: boolean = false;
  public ngOnInit(): void {
      /*this.communicationService.getHotelPKs().subscribe((hotelPKs: string[]) => {
          this.hotelPKs = hotelPKs;
          console.log(this.duplicateError);
          console.log(this.hotelPKs);
      });*/
  }

  public validateHotelNo(hotelNo: string): void {
    this.invalidHotelPK = this.hotelPKs.indexOf(hotelNo) === -1;
    console.log("===" + hotelNo + this.invalidHotelPK);
  }

  public insertFilm(filmID: number, title: string, genre: string, duration: string, productionDate: Date, price: number): void {
    const newFilm: Film = {
      "filmid": filmID,
      "title": title,
      "genre": genre,
      "duration": duration,
      "productiondate": productionDate,
      "price": price,
    };
    this.communicationService.insertFilm(newFilm).subscribe((res: number) => {
        console.log(res);
    });
}
}
