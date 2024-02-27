import { Component } from "@angular/core";
import { MovieComponent } from "../movie/movie.component";
import { PlaceholderComponent } from "../placeholder/placeholder.component";
import { MoviesSectionComponent } from "../movies-section/movies-section.component";

@Component({
    selector: "app-home-page",
    standalone: true,
    imports: [MovieComponent, PlaceholderComponent, MoviesSectionComponent],
    templateUrl: "./home-page.component.html",
    styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
    homePageSectionDetails = [
        {
            sectionTitle: "Now Playing",
            movieType: "nowPlaying",
            lazyDelay: false,
        },
        {
            sectionTitle: "Popular Movies",
            movieType: "popular",
            lazyDelay: true,
        },
        {
            sectionTitle: "Top Rated Movies",
            movieType: "topRated",
            lazyDelay: true,
        },
        {
            sectionTitle: "Upcoming Movies",
            movieType: "upcoming",
            lazyDelay: true,
        },
    ];
}
