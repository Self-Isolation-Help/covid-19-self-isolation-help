import { Injectable } from "@angular/core";
import { LOCATIONS } from "./locations";

@Injectable({
  providedIn: "root"
})
export class SubdomainService {
  subdomain: string;
  locations = LOCATIONS;
  location: string;
  county: string;

  constructor() {}

  getLabelForSubdomain() {
    const domain = window.location.hostname;
    let label = "";
    if (
      domain.indexOf(".") < 0 ||
      domain.split(".")[0] === "example" ||
      domain.split(".")[0] === "lvh" ||
      domain.split(".")[0] === "www"
    ) {
      this.subdomain = "";
    } else {
      this.subdomain = domain.split(".")[0];
      if(this.subdomain === 'preview') {
        return;
      }
      this.locations.forEach(location => {
        if (location.county.includes(this.subdomain)) {
          label = location.county;
          this.county = location.county;
          return;
        }

        location.items.forEach(item => {
          if (item.toLowerCase().includes(this.subdomain)) {
            label = item;
            this.location = label;
            this.county = location.county;
            return;
          }
        });
      });
    }

    return label;
  }

  getSubdomain() {
      return this.subdomain;
  }
  getLocationBySubdomain() {
    return this.location;
  }

  getCountyBySubdomain() {
    return this.county;
  }
}
