import { Component, Input, HostListener } from "@angular/core";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

const imgUrl = environment.imgUrl;

@Component({
    selector: "app-card",
    standalone: true,
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.css"],
})
export class CardComponent {
    @Input() movie: any;

    private isDragging = false;

    constructor(private router: Router) {}

    getFullImageUrl(posterPath: String): String {
        return imgUrl + posterPath;
    }

    handleImageError(event: any) {
        const placeholderImageUrl =
            "https://placehold.co/350x550?text=No+Cover";
        const img = event.target;
        img.src = placeholderImageUrl;
    }

    @HostListener("mousedown")
    onMouseDown() {
        this.isDragging = false;
    }

    @HostListener("mousemove")
    onMouseMove() {
        this.isDragging = true;
    }

    @HostListener("mouseup")
    onMouseUp() {
        if (!this.isDragging) {
            this.router.navigate(["/movie-detail", this.movie.id]);
        }
    }
}
