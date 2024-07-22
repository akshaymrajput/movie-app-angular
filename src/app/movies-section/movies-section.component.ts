import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-movies-section",
    standalone: true,
    templateUrl: "./movies-section.component.html",
    styleUrls: ["./movies-section.component.css"],
})
export class MoviesSectionComponent {
    @Input() sectionTitle: string;
    @Input() seeMoreUrl: string;

    constructor(private router: Router) {}

    redirectTo(uri: string) {
        this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate([uri]));
    }
}
