import { Component, OnInit } from '@angular/core';
import { Film } from '../../../../common/tables/Film';
import { CommunicationService } from './../communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  films: Film[]
  infoButtonValue: number = 0;
  constructor(private communicationService:CommunicationService, private router:Router) { }

  ngOnInit(): void {
    this.communicationService.getFilms().subscribe((res: Film[]) => {
      this.films = res;
    });
  }
  showInfo(i: number){
    if(i+1 === this.infoButtonValue ){
      this.infoButtonValue = 0;
      return;
    }
    this.infoButtonValue = i+1 ;
  }
  watchFilm(i: number){
    this.router.navigate(['/home/watchFilm/',this.films[i].filmid]);
  }
}