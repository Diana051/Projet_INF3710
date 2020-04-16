import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { FilmComponent } from "./film/film.component";
import { MemberComponent } from "./member/member.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "film", component: FilmComponent },
  { path: "membre", component: MemberComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
