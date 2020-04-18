import { Component, OnInit } from '@angular/core';
import { Film } from '../../../../common/tables/Film';
import { CommunicationService } from './../communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  films: Film[]
  constructor(private communicationService:CommunicationService) { }

  ngOnInit(): void {
    this.communicationService.getFilms().subscribe((res: Film[]) => {
      this.films = res;
    });
  }
}