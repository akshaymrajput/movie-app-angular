import { Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { MovieComponent } from "../movie/movie.component";
import { PlaceholderComponent } from "../placeholder/placeholder.component";
import { MoviesSectionComponent } from "../movies-section/movies-section.component";
import { Router } from "@angular/router";
import { gsap } from "gsap";
@Component({
    selector: "app-home-page",
    standalone: true,
    imports: [MovieComponent, PlaceholderComponent, MoviesSectionComponent],
    templateUrl: "./home-page.component.html",
    styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
    @ViewChildren(MoviesSectionComponent, { read: ElementRef })
    sections: QueryList<ElementRef>;

    constructor(private router: Router) {}

    homePageSectionDetails = [
        {
            sectionTitle: "Now Playing",
            movieType: "nowPlaying",
            seeMoreUrl: "/now-playing",
        },
        {
            sectionTitle: "Popular Movies",
            movieType: "popular",
            seeMoreUrl: "/popular-movies",
        },
        {
            sectionTitle: "Top Rated Movies",
            movieType: "topRated",
            seeMoreUrl: "/top-rated-movies",
        },
        {
            sectionTitle: "Upcoming Movies",
            movieType: "upcoming",
            seeMoreUrl: "/upcoming-movies",
        },
    ];

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.sections.forEach((section, index) => {
            gsap.from(section.nativeElement, {
                duration: 1,
                opacity: 0,
                y: 50,
                ease: "power3.out",
                delay: index * 0.3,
            });
        });
    }

    redirectTo(uri: string) {
        this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate([uri]));
    }
}
