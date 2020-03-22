import { Component, OnInit } from "@angular/core";
import { isDevMode } from "@angular/core";
import { SubdomainService } from '../subdomain.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  isDevMode: boolean;

  locationLabel: string;

  constructor(private subdomainService: SubdomainService) {}

  ngOnInit() {
    this.isDevMode = isDevMode();
    this.locationLabel = this.subdomainService.getLabelForSubdomain();
  }


}
