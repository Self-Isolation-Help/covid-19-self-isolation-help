import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { COUNTIES } from "../counties";
import { LOCATIONS } from "../locations";
import { COUNTIES_LOCATION_MAP } from "../counties-location-map";
import { SubdomainService } from "../subdomain.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"]
})
export class SignUpPage implements OnInit {
  form: any = {};
  counties: string[] = COUNTIES.sort();
  locations = LOCATIONS.sort();
  locationsAssociatedWithCounty;
  countiesLocationMap = COUNTIES_LOCATION_MAP;
  locationsList = [];
  subdomain;

  constructor(
    private router: Router,
    private subdomainService: SubdomainService
  ) {}

  ngOnInit() {
    this.subdomain = this.subdomainService.getLabelForSubdomain();

    this.form.location = this.subdomainService.getLocationBySubdomain();
    this.form.county = this.subdomainService.getCountyBySubdomain();
    this.onChangeCounty();
  }
  onChangeCounty() {
    this.locationsAssociatedWithCounty = this.countiesLocationMap.find(
      map => map.county === this.form.county
    );
    if (this.locationsAssociatedWithCounty) {
      this.locationsList = this.locations.find(
        location =>
          location.label === this.locationsAssociatedWithCounty.locations
      ).items;
      this.form.locationType = this.locationsAssociatedWithCounty.locations;
    } else {
      delete this.form.location;
    }
  }
  onChangeTown() {
    if (this.form.town.toLowerCase() === "london") {
      this.form.county = "Greater London";
    } else {
      delete this.form.county;
    }
  }
}
