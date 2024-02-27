import { Component, Input } from "@angular/core";
import { environment } from "../../environments/environment";
import { RouterLink } from "@angular/router";

const imgUrl = environment.imgUrl;

@Component({
  selector: "app-card",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.css",
})
export class CardComponent {
  @Input() movie: any;

  getFullImageUrl(posterPath: String): String {
    return imgUrl + posterPath;
  }

  handleImageError(event: any) {
    const placeholderImageUrl = "https://placehold.co/350x550?text=No+Cover";
    const img = event.target;
    img.src = placeholderImageUrl;
  }
}
