import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { NowPlayingComponent } from "./now-playing/now-playing.component";
import { PopularMoviesComponent } from "./popular-movies/popular-movies.component";
import { TopRatedMoviesComponent } from "./top-rated-movies/top-rated-movies.component";
import { UpcomingMoviesComponent } from "./upcoming-movies/upcoming-movies.component";

export const routes: Routes = [
    {
        path: "",
        component: HomePageComponent,
    },
    {
        path: "now-playing",
        component: NowPlayingComponent,
    },
    {
        path: "popular-movies",
        component: PopularMoviesComponent,
    },
    {
        path: "top-rated-movies",
        component: TopRatedMoviesComponent,
    },
    {
        path: "upcoming-movies",
        component: UpcomingMoviesComponent,
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
