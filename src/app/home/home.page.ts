import { Component, OnInit } from "@angular/core";
import { isDevMode } from "@angular/core";
import { SubdomainService } from "../subdomain.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  isDevMode: boolean;
  hasCookie: boolean;
  locationLabel: string;

  constructor(
    private subdomainService: SubdomainService,
    private cookieService: CookieService
  ) {}

  setCookie() {
    this.cookieService.set("set-cookie", "true");
    this.hasCookie = true;
  }

  ngOnInit() {
    this.isDevMode = isDevMode();
    this.locationLabel = this.subdomainService.getLabelForSubdomain();
    this.hasCookie = this.cookieService.get("set-cookie") !== "";
  }
}
