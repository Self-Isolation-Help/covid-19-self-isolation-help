import { Component, isDevMode, OnInit } from "@angular/core";

@Component({
  selector: "app-volunteers",
  templateUrl: "./volunteers.page.html",
  styleUrls: ["./volunteers.page.scss"]
})
export class VolunteersPage implements OnInit {
  isDevMode: boolean;

  constructor() {}

  ngOnInit() {
    this.isDevMode = isDevMode();
  }
}
