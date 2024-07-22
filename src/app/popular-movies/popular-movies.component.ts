import {
    Component,
    OnInit,
    inject,
    HostListener,
    ElementRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from "@angular/core";
import { MovieService } from "../services/movie.service";
import { MovieDetail } from "../interfaces/movie-detail";
import { CardComponent } from "../card/card.component";
import { CommonModule } from "@angular/common";
import { gsap } from "gsap";
import { debounceTime, fromEvent, Subject } from "rxjs";

@Component({
    selector: "app-popular-movies",
    standalone: true,
    imports: [CardComponent, CommonModule],
    templateUrl: "./popular-movies.component.html",
    styleUrls: ["./popular-movies.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularMoviesComponent implements OnInit {
    private movieService = inject(MovieService);
    movies: MovieDetail[] = [];
    page = 1;
    loading = false;
    private scrollSubject = new Subject<void>();

    constructor(
        private elementRef: ElementRef,
        private cd: ChangeDetectorRef
    ) {}

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
        this.movieService.getPopularMovies(this.page).subscribe({
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
        this.cd.detectChanges();
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
