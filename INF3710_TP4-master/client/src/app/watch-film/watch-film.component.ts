import { Component, OnInit, ViewChild, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { CommunicationService } from './../communication.service';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-watch-film',
  templateUrl: './watch-film.component.html',
  styleUrls: ['./watch-film.component.css']
})
export class WatchFilmComponent implements OnInit , AfterViewInit{
  @ViewChild('videoref') refVideo: ElementRef;
  video: HTMLVideoElement;
  filmid: string | null;
  constructor(private renderer: Renderer2, private route:ActivatedRoute, private communicationService:CommunicationService, private authService:AuthService) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.filmid = this.route.snapshot.paramMap.get('filmID');
    });
  }
  ngAfterViewInit(){
    this.video = this.refVideo.nativeElement;
    
    if(this.filmid ){
      let filmAsString = this.filmid as string;
      this.communicationService.getWatchTime({userid: this.authService.user.member.memberid.toString(), filmid: filmAsString}).subscribe((res: number) => {
   
        this.video.currentTime = res;
      });
    }
    
    
    this.renderer.listen(this.video, 'timeupdate', () => {
      this.communicationService.upadeWatchTime({userid:this.authService.user.member.memberid.toString(), filmid:this.filmid as string, watchTime:this.video.currentTime.toString()}).subscribe((res: number) => {

      });
      
    });
  }

}
