import { Component, Input, OnInit, ViewChild, inject } from "@angular/core";
import { MovieService } from "../services/movie.service";
import { MovieDetail } from "../interfaces/movie-detail";
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from "@angular/router";
import { CardComponent } from "../card/card.component";
import {
    SlickCarouselComponent,
    SlickCarouselModule,
} from "ngx-slick-carousel";

@Component({
    selector: "app-movie",
    standalone: true,
    imports: [HeaderComponent, RouterLink, CardComponent, SlickCarouselModule],
    templateUrl: "./movie.component.html",
    styleUrls: ["./movie.component.css"],
})
export class MovieComponent implements OnInit {
    @ViewChild("slickModal") slickModal!: SlickCarouselComponent;
    private movieService = inject(MovieService);
    private _searchQuery: string | undefined;
    private page = 1;

    @Input()
    set searchQuery(value: string | undefined) {
        this._searchQuery = value;
        this.searchMovies(value);
    }

    @Input() movieType: string | undefined;
    movies: MovieDetail[] = [];

    slideConfig = {
        slidesToShow: 5,
        slidesToScroll: 4,
        arrows: false,
        infinite: false,
        dots: false,
        lazyLoad: "ondemand",
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        afterChange: (currentSlide: number) => this.onAfterChange(currentSlide),
    };

    ngOnInit(): void {
        this.loadMovies();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initializeCarousel();
        }, 1000);
    }

    initializeCarousel() {
        if (this.slickModal) {
            this.slickModal.initSlick();
        }
    }

    loadMovies() {
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

    loadNowPlayingMovies() {
        this.movieService.getNowPlayingMovies(this.page).subscribe({
            next: (res: any) => {
                this.movies = this.movies.concat(res.results as MovieDetail[]);
                this.initializeCarousel();
            },
            error: (error) => console.log("Error in fetching movies", error),
        });
    }

    loadPopularMovies() {
        this.movieService.getPopularMovies(this.page).subscribe({
            next: (res: any) => {
                this.movies = this.movies.concat(res.results as MovieDetail[]);
                this.initializeCarousel();
            },
            error: (error) => console.log("Error in fetching movies", error),
        });
    }

    loadTopRatedMovies() {
        this.movieService.getTopRatedMovies(this.page).subscribe({
            next: (res: any) => {
                this.movies = this.movies.concat(res.results as MovieDetail[]);
                this.initializeCarousel();
            },
            error: (error) => console.log("Error in fetching movies", error),
        });
    }

    loadUpcomingMovies() {
        this.movieService.getUpcomingMovies(this.page).subscribe({
            next: (res: any) => {
                this.movies = this.movies.concat(res.results as MovieDetail[]);
                this.initializeCarousel();
            },
            error: (error) => console.log("Error in fetching movies", error),
        });
    }

    searchMovies(searchQuery: string | undefined) {
        this.page = 1;
        if (searchQuery && searchQuery.trim() !== "") {
            this.movieService
                .searchMoviesByKeyword(searchQuery, this.page)
                .subscribe({
                    next: (res: any) => {
                        this.movies = res.results as MovieDetail[];
                        this.initializeCarousel();
                    },
                    error: (error) =>
                        console.log("Error in searching movies", error),
                });
        } else {
            this.loadMovies();
        }
    }

    onAfterChange(currentSlide: number) {
        const totalSlides = this.movies.length;
        const slidesToShow = this.slideConfig.slidesToShow as number;

        if (currentSlide + slidesToShow >= totalSlides) {
            this.page++;
            this.loadMovies();
        }
    }
}
