import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AdministrateurComponent } from "./administrateur/administrateur.component";
import { AppMaterialModule } from "./app-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { FilmComponent } from "./film/film.component";
import { listFilmComponent } from "./film/list_film/list_film.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MemberComponent } from "./member/member.component";

@NgModule({
  declarations: [
    AppComponent,
    FilmComponent,
    MemberComponent,
    LoginComponent,
    AdministrateurComponent,
    listFilmComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
