import {
    Component,
    OnInit,
    inject,
    HostListener,
    ElementRef,
} from "@angular/core";
import { MovieService } from "../services/movie.service";
import { MovieDetail } from "../interfaces/movie-detail";
import { CardComponent } from "../card/card.component";
import { CommonModule } from "@angular/common";
import { gsap } from "gsap";
import { debounceTime, fromEvent, Subject } from "rxjs";

@Component({
    selector: "app-top-rated-movies",
    standalone: true,
    imports: [CardComponent, CommonModule],
    templateUrl: "./top-rated-movies.component.html",
    styleUrls: ["./top-rated-movies.component.css"],
})
export class TopRatedMoviesComponent implements OnInit {
    private movieService = inject(MovieService);
    movies: MovieDetail[] = [];
    page = 1;
    loading = false;
    private scrollSubject = new Subject<void>();

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.loadMovies();
        this.scrollSubject.pipe(debounceTime(300)).subscribe(() => {
            this.loadMovies();
        });

        fromEvent(window, "scroll")
            .pipe(debounceTime(300))
            .subscribe(() => {
                if (
                    window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 200
                ) {
                    this.scrollSubject.next();
                }
            });
    }

    loadMovies() {
        if (this.loading) return;

        this.loading = true;
        const currentMovieCount = this.movies.length;
        this.movieService.getTopRatedMovies(this.page).subscribe({
            next: (res: any) => {
                const newMovies = res.results as MovieDetail[];
                this.page++;
                this.loading = false;
                this.addMovies(newMovies, currentMovieCount);
            },
            error: (error) => {
                console.log("Error in fetching movies", error);
                this.loading = false;
            },
        });
    }

    addMovies(newMovies: MovieDetail[], currentMovieCount: number) {
        this.movies = this.movies.concat(newMovies);
        setTimeout(() => {
            const movieList =
                this.elementRef.nativeElement.querySelector(".movie-list");
            const newItems = Array.from(movieList.children).slice(
                currentMovieCount
            );
            gsap.from(newItems, {
                duration: 0.8,
                opacity: 0,
                y: 50,
                stagger: 0.1,
                ease: "power3.out",
            });
        }, 100);
    }
    trackByMovie(index: number, movie: MovieDetail): number {
        return movie.id;
    }
}
