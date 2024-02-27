import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieComponent } from "../movie/movie.component";
import { SearchComponent } from "../search/search.component";
import { PlaceholderComponent } from "../placeholder/placeholder.component";
import { MoviesSectionComponent } from "../movies-section/movies-section.component";

@Component({
    selector: "app-search-result",
    standalone: true,
    imports: [
        MovieComponent,
        SearchComponent,
        PlaceholderComponent,
        MoviesSectionComponent,
    ],
    templateUrl: "./search-result.component.html",
    styleUrl: "./search-result.component.css",
})
export class SearchResultComponent implements OnInit {
    searchTerm: string | undefined;
    sectionTitle: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.searchTerm = params["searchTerm"];
            this.sectionTitle = this.searchTerm;
        });
    }
}
