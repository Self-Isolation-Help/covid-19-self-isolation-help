import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Router, RouterLink } from "@angular/router";
import { UserService } from "../user.service";

@Component({
  selector: "app-share-location",
  templateUrl: "./share-location.page.html",
  styleUrls: ["./share-location.page.scss"],
})
export class ShareLocationPage implements OnInit {
  hasSharedLocation = false;
  loading = false;
  constructor(
    private geolocation: Geolocation,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {}

  getLocation() {
    this.loading = true;
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.loading = false;
        this.hasSharedLocation = true;
        this.userService.updateUser({
          location: { lat: resp.coords.latitude, lng: resp.coords.longitude },
        });
        this.router.navigateByUrl("info");
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }
}
