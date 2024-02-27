import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MovieDetail, MovieDetailPage } from "../interfaces/movie-detail";

const apiBaseUrl = environment.apiBaseUrl;
const apiKey = environment.apiKey;

const apiPaths = {
    discoverMovie: "/discover/movie",
    movieDetails: (id: number) =>
        `/movie/${id}?api_key=${apiKey}&language=en-US`,
    movieVideos: (id: number) =>
        `/movie/${id}/videos?api_key=${apiKey}&language=en-US`,
    movieReviews: (id: number) =>
        `/movie/${id}/reviews?api_key=${apiKey}&language=en-US`,
    movieRecommendations: (id: number) =>
        `/movie/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`,
    nowPlayingMovie: `/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`,
    popularMovie: `/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    topRatedMovie: `/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`,
    upcomingMovie: `/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
    searchMovieByKeyword: (keyword: string) =>
        `/search/movie?api_key=${apiKey}&query=${keyword}&page=1`,
};

@Injectable({
    providedIn: "root",
})
export class MovieService {
    private http = inject(HttpClient);

    constructor() {}

    getMovies(): Observable<MovieDetail> {
        return this.http.get<MovieDetail>(
            `${apiBaseUrl}${apiPaths.discoverMovie}?api_key=${apiKey}`
        );
    }

    getMovie(id: number): Observable<MovieDetailPage> {
        return this.http.get<MovieDetailPage>(
            `${apiBaseUrl}${apiPaths.movieDetails(id)}`
        );
    }

    getMovieVideos(id: number): Observable<MovieDetailPage> {
        return this.http.get<MovieDetailPage>(
            `${apiBaseUrl}${apiPaths.movieVideos(id)}`
        );
    }

    getMovieReviews(id: number): Observable<MovieDetailPage> {
        return this.http.get<MovieDetailPage>(
            `${apiBaseUrl}${apiPaths.movieReviews(id)}`
        );
    }
    getMovieRecommendations(id: number): Observable<MovieDetailPage> {
        return this.http.get<MovieDetailPage>(
            `${apiBaseUrl}${apiPaths.movieRecommendations(id)}`
        );
    }

    getNowPlayingMovies(): Observable<MovieDetail> {
        return this.http.get<MovieDetail>(
            `${apiBaseUrl}${apiPaths.nowPlayingMovie}`
        );
    }

    getPopularMovies(): Observable<MovieDetail> {
        return this.http.get<MovieDetail>(
            `${apiBaseUrl}${apiPaths.popularMovie}`
        );
    }

    getTopRatedMovies(): Observable<MovieDetail> {
        return this.http.get<MovieDetail>(
            `${apiBaseUrl}${apiPaths.topRatedMovie}`
        );
    }

    getUpcomingMovies(): Observable<MovieDetail> {
        return this.http.get<MovieDetail>(
            `${apiBaseUrl}${apiPaths.upcomingMovie}`
        );
    }

    searchMoviesByKeyword(search: string): Observable<MovieDetail> {
        return this.http.get<MovieDetail>(
            `${environment.apiBaseUrl}${apiPaths.searchMovieByKeyword(search)}`
        );
    }
}
