import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";

@Component({
  selector: "app-complete",
  templateUrl: "./complete.page.html",
  styleUrls: ["./complete.page.scss"]
})
export class CompletePage implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.resetUser();
  }
}
