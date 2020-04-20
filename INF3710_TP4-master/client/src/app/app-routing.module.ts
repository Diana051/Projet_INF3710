import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { FilmComponent } from "./film/film.component";
import { MemberComponent } from "./member/member.component";
import { LoginComponent } from "./login/login.component";
import { AdministrateurComponent } from "./administrateur/administrateur.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuardService } from "./guards/auth-guard.service";
import { WatchFilmComponent } from "./watch-film/watch-film.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "administrateur/film", component: FilmComponent },
  { path: "administrateur/membre", component: MemberComponent },
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent, canActivate: [AuthGuardService],},
  {path: "administrateur", component: AdministrateurComponent},
  {path: "home/watchFilm/:filmID", component: WatchFilmComponent, canActivate: [AuthGuardService],}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
exports: [ RouterModule ]
})
export class AppRoutingModule { }
