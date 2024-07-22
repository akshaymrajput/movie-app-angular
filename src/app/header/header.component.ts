import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { gsap } from "gsap";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
    searchQuery: string = "";
    @ViewChild("searchInput") searchInput!: ElementRef;
    @ViewChild("searchContainer") searchContainer!: ElementRef;
    @ViewChild("searchIconContainer") searchIconContainer!: ElementRef;
    @ViewChild("closeIconContainer") closeIconContainer!: ElementRef;
    @ViewChild("logo") logo!: ElementRef;

    constructor(private router: Router) {}

    ngOnInit(): void {
        gsap.from(".container", {
            duration: 1,
            opacity: 0,
            y: -50,
            ease: "bounce",
        });
        gsap.from(".logo", {
            duration: 1.5,
            opacity: 0,
            scale: 0.5,
            ease: "elastic",
        });
    }

    ngAfterViewInit(): void {
        this.hideElement(this.closeIconContainer.nativeElement);
        this.addHoverAnimations();
    }

    handleSubmit(event: any) {
        event.preventDefault();
        this.searchQuery = (event.target as HTMLInputElement).value;
        const searchTerm = this.searchQuery.trim();
        if (searchTerm) {
            this.router.navigate(["/search-result", searchTerm]);
            (event.target as HTMLInputElement).value = "";
            this.hideSearchBar();
        }
    }

    showSearchBar() {
        const searchContainerWidth =
            window.innerWidth <= 768 ? "150px" : "300px";

        gsap.timeline()
            .to(this.searchContainer.nativeElement, {
                display: "flex",
                opacity: 1,
                width: searchContainerWidth,
                duration: 0.5,
                ease: "power2.inOut",
            })
            .to(
                this.searchIconContainer.nativeElement,
                {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        gsap.set(this.searchIconContainer.nativeElement, {
                            display: "none",
                        });
                        gsap.set(this.closeIconContainer.nativeElement, {
                            display: "block",
                            opacity: 1,
                        });
                        this.searchInput.nativeElement.focus();
                    },
                },
                "<"
            );
        if (window.innerWidth <= 768) {
            gsap.to(this.logo.nativeElement, {
                opacity: 0,
                duration: 0.5,
            });
        }
    }

    hideSearchBar() {
        gsap.timeline()
            .to(this.searchContainer.nativeElement, {
                opacity: 0,
                width: 0,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(this.searchContainer.nativeElement, {
                        display: "none",
                    });
                },
            })
            .to(
                this.closeIconContainer.nativeElement,
                {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        gsap.set(this.closeIconContainer.nativeElement, {
                            display: "none",
                        });
                        gsap.set(this.searchIconContainer.nativeElement, {
                            display: "block",
                            opacity: 1,
                        });
                    },
                },
                "<"
            );
        if (window.innerWidth <= 768) {
            gsap.to(this.logo.nativeElement, {
                opacity: 1,
                duration: 0.5,
            });
        }
    }

    hideElement(element: HTMLElement) {
        gsap.set(element, { display: "none", opacity: 0 });
    }

    addHoverAnimations() {
        const searchIcon = this.searchIconContainer.nativeElement;
        const closeIcon = this.closeIconContainer.nativeElement;

        [searchIcon, closeIcon].forEach((icon) => {
            icon.addEventListener("mouseenter", () => {
                gsap.to(icon, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: "power1.inOut",
                });
            });
            icon.addEventListener("mouseleave", () => {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power1.inOut",
                });
            });
        });
    }
}
