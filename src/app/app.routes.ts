import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "search-result/:searchTerm",
    component: SearchResultComponent,
  },
  {
    path: "movie-detail/:id",
    component: MovieDetailComponent,
  },
  {
    path: "**",
    component: NotFoundPageComponent,
  },
];
