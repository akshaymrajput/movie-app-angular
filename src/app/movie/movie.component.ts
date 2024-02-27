import { Component, Input, OnInit, inject } from "@angular/core";
import { MovieService } from "../services/movie.service";
import { MovieDetail } from "../interfaces/movie-detail";
import { SearchComponent } from "../search/search.component";
import { RouterLink } from "@angular/router";
import { CardComponent } from "../card/card.component";

@Component({
    selector: "app-movie",
    standalone: true,
    imports: [SearchComponent, RouterLink, CardComponent],
    templateUrl: "./movie.component.html",
    styleUrl: "./movie.component.css",
})
export class MovieComponent implements OnInit {
    private movieService = inject(MovieService);
    private _searchQuery: string | undefined; // variable to store search query

    @Input()
    set searchQuery(value: string | undefined) {
        this._searchQuery = value;
        this.searchMovies(value); // Call searchMovies whenever searchQuery changes
    }

    @Input() movieType: string | undefined; // input property to accept movie type
    movies: MovieDetail[] = []; // for storing list of movies to display movie cards

    ngOnInit(): void {
        if (this.movieType === "nowPlaying") {
            this.loadNowPlayingMovies();
        } else if (this.movieType === "popular") {
            this.loadPopularMovies();
        } else if (this.movieType === "topRated") {
            this.loadTopRatedMovies();
        } else if (this.movieType === "upcoming") {
            this.loadUpcomingMovies();
        }
    }

    loadMovies() {
        this.movieService.getMovies().subscribe({
            next: (res: any) => {
                this.movies = res.results as MovieDetail[];
                console.log(res.results);
            },
            error: (error) => console.log("Error in fetching movies", error),
        });
    }

    loadNowPlayingMovies() {
        this.movieService.getNowPlayingMovies().subscribe({
            next: (res: any) => {
                this.movies = res.results as MovieDetail[];
                console.log(res.results);
            },
            error: (error) => console.log("Error in fetching movies", error),
        });
    }

    loadPopularMovies() {
        this.movieService.getPopularMovies().subscribe({
            next: (res: any) => {
                this.movies = res.results as MovieDetail[];
                console.log(res.results);
            },
            error: (error) => console.log("Error in fetching movies", error),
        });
    }

    loadTopRatedMovies() {
        this.movieService.getTopRatedMovies().subscribe({
            next: (res: any) => {
                this.movies = res.results as MovieDetail[];
                console.log(res.results);
            },
            error: (error) => console.log("Error in fetching movies", error),
        });
    }
    loadUpcomingMovies() {
        this.movieService.getUpcomingMovies().subscribe({
            next: (res: any) => {
                this.movies = res.results as MovieDetail[];
                console.log(res.results);
            },
            error: (error) => console.log("Error in fetching movies", error),
        });
    }

    searchMovies(searchQuery: string | undefined) {
        if (searchQuery && searchQuery.trim() !== "") {
            this.movieService.searchMoviesByKeyword(searchQuery).subscribe({
                next: (res: any) => {
                    this.movies = res.results as MovieDetail[];
                },
                error: (error) =>
                    console.log("Error in searching movies", error),
            });
        } else {
            this.loadMovies();
        }
    }
}
