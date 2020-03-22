import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { COUNTIES } from "../counties";
import { LOCATIONS } from "../locations";
import { COUNTIES_LOCATION_MAP } from "../counties-location-map";

@Component({
  selector: "app-address",
  templateUrl: "./address.page.html",
  styleUrls: ["./address.page.scss"]
})
export class AddressPage implements OnInit {
  submitted = false;
  form: any = {};
  counties: string[] = COUNTIES.sort();
  locations = LOCATIONS.sort();
  locationsAssociatedWithCounty;
  countiesLocationMap = COUNTIES_LOCATION_MAP;
  locationsList = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (this.userService.user.details) {
      this.form = this.userService.user.details;
    }
  }

  onSubmitForm($event, form) {
    this.submitted = true;

    if (form.form.status !== "INVALID") {
      this.userService.updateUser({ details: this.form });
      this.router.navigateByUrl("/confirmation");
    }
  }

  onChangeDontShare($event, form) {
    if ($event.detail.checked) {
      delete this.form.address1;
      delete this.form.address2;
      delete this.form.postCode;
    }
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
