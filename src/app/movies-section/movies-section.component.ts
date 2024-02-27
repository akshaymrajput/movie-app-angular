import { Component, Input } from "@angular/core";

@Component({
  selector: "app-movies-section",
  standalone: true,
  imports: [],
  templateUrl: "./movies-section.component.html",
  styleUrl: "./movies-section.component.css",
})
export class MoviesSectionComponent {
  @Input() sectionTitle: any;
}
