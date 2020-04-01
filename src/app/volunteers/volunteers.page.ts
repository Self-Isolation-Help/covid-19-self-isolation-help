import { Component, isDevMode, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-volunteers",
  templateUrl: "./volunteers.page.html",
  styleUrls: ["./volunteers.page.scss"],
})
export class VolunteersPage implements OnInit {
  isDevMode: boolean;

  // constructor() {}
  safeSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://www.youtube.com/embed/tCZyKLhGGhg"
    );
  }

  ngOnInit() {
    this.isDevMode = isDevMode();
  }
}
