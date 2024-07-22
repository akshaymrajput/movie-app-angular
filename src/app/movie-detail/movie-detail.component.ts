import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../services/movie.service";
import { MovieDetailPage } from "../interfaces/movie-detail";
import { environment } from "../../environments/environment";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CardComponent } from "../card/card.component";
import { forkJoin } from "rxjs";

const imgUrl = environment.imgUrl;

@Component({
    selector: "app-movie-detail",
    standalone: true,
    imports: [CommonModule, CardComponent],
    templateUrl: "./movie-detail.component.html",
    styleUrls: ["./movie-detail.component.css"],
})
export class MovieDetailComponent implements OnInit {
    private movieService = inject(MovieService);

    movieId: number | undefined;
    movie: MovieDetailPage | null = null;
    loading = true;

    movieVideos: any[] = [];
    safeVideoUrls: SafeResourceUrl[] = [];

    movieReviews: any[] = [];
    movieRecommendations: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.movieId = +params["id"];
            console.log("Movie ID from URL:", this.movieId);

            this.loadMovieData(this.movieId);
        });
    }

    loadMovieData(id: number) {
        const movieDetails$ = this.movieService.getMovie(id);
        const movieVideos$ = this.movieService.getMovieVideos(id);
        const movieReviews$ = this.movieService.getMovieReviews(id);
        const movieRecommendations$ =
            this.movieService.getMovieRecommendations(id);

        forkJoin([
            movieDetails$,
            movieVideos$,
            movieReviews$,
            movieRecommendations$,
        ]).subscribe({
            next: ([
                movieDetails,
                movieVideos,
                movieReviews,
                movieRecommendations,
            ]) => {
                this.movie = movieDetails;
                this.movieVideos = movieVideos.results;
                this.safeVideoUrls = this.movieVideos.map((video) =>
                    this.getSafeVideoUrl(video.key)
                );
                this.movieReviews = movieReviews.results.filter(
                    (review: { author_details: { rating: null } }) =>
                        review.author_details.rating !== null
                );
                this.movieRecommendations = movieRecommendations.results.filter(
                    (recommendation: { overview: string }) =>
                        recommendation.overview !== ""
                );
                this.loading = false;
                console.log("All movie data loaded successfully");
            },
            error: (error) => {
                console.log("Error in fetching movie data", error);
                this.loading = false;
            },
        });
    }

    handleAvatar(avatarPath: string | null): string {
        return avatarPath
            ? imgUrl + avatarPath
            : "https://avatar.iran.liara.run/public";
    }

    formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString();
    }

    getSafeVideoUrl(key: string): SafeResourceUrl {
        const url = `https://www.youtube.com/embed/${key}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    handleImgBackdrop(url: string | undefined): string {
        return imgUrl + url;
    }

    handleImgPoster(url: string | undefined): string {
        return imgUrl + url;
    }

    getGenres(): string | undefined {
        return this.movie?.genres.map((genre) => genre.name).join(", ");
    }
}

// import { Component, OnInit, inject } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import { MovieService } from "../services/movie.service";
// import { MovieDetailPage } from "../interfaces/movie-detail";
// import { environment } from "../../environments/environment";
// import { CommonModule } from "@angular/common";
// import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
// import { CardComponent } from "../card/card.component";

// const imgUrl = environment.imgUrl;

// @Component({
//     selector: "app-movie-detail",
//     standalone: true,
//     imports: [CommonModule, CardComponent],
//     templateUrl: "./movie-detail.component.html",
//     styleUrl: "./movie-detail.component.css",
// })
// export class MovieDetailComponent implements OnInit {
//     private movieService = inject(MovieService);

//     movieId: number | undefined;
//     movie: MovieDetailPage | null = null; // for details of a movie
//     loading = true; // Add loading state

//     movieVideos: any[] = [];
//     safeVideoUrls: SafeResourceUrl[] = [];

//     movieReviews: any[] = [];
//     movieRecommendations: any[] = [];

//     constructor(
//         private route: ActivatedRoute,
//         private sanitizer: DomSanitizer
//     ) {}

//     ngOnInit(): void {
//         this.route.params.subscribe((params) => {
//             this.movieId = +params["id"];
//             console.log("Movie ID from URL:", this.movieId);

//             this.loadMovieDetails(this.movieId);
//             this.loadMovieVideos(this.movieId);
//             this.loadMovieReviews(this.movieId);
//             this.loadMovieRecommendations(this.movieId);
//         });
//     }

//     loadMovieDetails(id: number) {
//         this.movieService.getMovie(id).subscribe({
//             next: (res: any) => {
//                 this.movie = res;
//                 this.loading = false;
//                 console.log("response of movie details --------->", res);
//             },
//             error: (error) => console.log("Error in fetching movies", error),
//         });
//     }

//     loadMovieVideos(id: number) {
//         this.movieService.getMovieVideos(id).subscribe({
//             next: (res: any) => {
//                 this.movieVideos = res.results;
//                 this.safeVideoUrls = this.movieVideos.map((video) =>
//                     this.getSafeVideoUrl(video.key)
//                 );
//                 console.log("response of movie videos --------->", res);
//                 console.log("safeUrls --------->", this.safeVideoUrls);
//             },
//             error: (error) =>
//                 console.log("Error in fetching movie videos", error),
//         });
//     }

//     loadMovieReviews(id: number) {
//         this.movieService.getMovieReviews(id).subscribe({
//             next: (res: any) => {
//                 this.movieReviews = res.results.filter(
//                     (review: { author_details: { rating: null } }) =>
//                         review.author_details.rating !== null
//                 );
//                 console.log("response of movie reviews --------->", res);
//             },
//             error: (error) => console.log("Error in fetching reviews", error),
//         });
//     }
//     loadMovieRecommendations(id: number) {
//         this.movieService.getMovieRecommendations(id).subscribe({
//             next: (res: any) => {
//                 this.movieRecommendations = res.results.filter(
//                     (recommendation: { overview: string }) =>
//                         recommendation.overview !== ""
//                 );
//                 console.log(
//                     "response of movie recommendations --------->",
//                     res
//                 );
//             },
//             error: (error) =>
//                 console.log("Error in fetching recommendations", error),
//         });
//     }

//     handleAvatar(avatarPath: string | null): string {
//         return avatarPath
//             ? imgUrl + avatarPath
//             : "https://avatar.iran.liara.run/public";
//     }

//     formatDate(dateString: string): string {
//         return new Date(dateString).toLocaleDateString();
//     }

//     getSafeVideoUrl(key: string): SafeResourceUrl {
//         const url = `https://www.youtube.com/embed/${key}`;
//         return this.sanitizer.bypassSecurityTrustResourceUrl(url);
//     }

//     handleImgBackdrop(url: string | undefined): string {
//         return imgUrl + url;
//     }

//     handleImgPoster(url: string | undefined): string {
//         return imgUrl + url;
//     }

//     getGenres(): string | undefined {
//         return this.movie?.genres.map((genre) => genre.name).join(", ");
//     }
// }
