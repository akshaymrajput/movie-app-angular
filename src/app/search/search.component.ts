import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: "app-search",
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: "./search.component.html",
    styleUrl: "./search.component.css",
})
export class SearchComponent {
    searchQuery: string = "";

    constructor(private router: Router) {}

    handleSubmit(event: any) {
        event.preventDefault();
        this.searchQuery = (event.target as HTMLInputElement).value;
        const searchTerm = this.searchQuery.trim();
        if (searchTerm) {
            this.router.navigate(["/search-result", searchTerm]);
            (event.target as HTMLInputElement).value = "";
        }
    }

    // handleFormSubmit(event: any) {
    //     event.preventDefault();
    //     const searchTerm = this.searchQuery.trim();
    //     if (searchTerm) {
    //         this.router.navigate(["/search-result", searchTerm]);
    //     }
    // }

    // onInputChange(event: Event) {
    //     this.searchQuery = (event.target as HTMLInputElement).value;
    // }
}
