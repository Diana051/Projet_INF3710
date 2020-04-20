import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmBD } from '../../../../common/tables/Film';
import { CommunicationService } from './../communication.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public films: FilmBD[];
  public infoButtonValue: number = 0;
  constructor(private communicationService: CommunicationService, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.communicationService.getFilms().subscribe((res: FilmBD[]) => {
      this.films = res;
    });
  }
  public showInfo(i: number): void {
    if (i + 1 === this.infoButtonValue ) {
      this.infoButtonValue = 0;
      return;
    }
    this.infoButtonValue = i + 1 ;
  }
  public watchFilm(i: number): void {
    this.router.navigate(['/home/watchFilm/',this.films[i].filmId]);
  }

  public buyDVD(film: FilmBD): void {
    this.communicationService.buyDVD(film, this.authservice.user.member);
  }
}