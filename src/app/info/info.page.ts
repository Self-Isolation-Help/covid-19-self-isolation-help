import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-info",
  templateUrl: "./info.page.html",
  styleUrls: ["./info.page.scss"],
})
export class InfoPage implements OnInit {
  form: any = {};

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (this.userService.user.info) {
      this.form = this.userService.user.info;
    }
  }
  onSubmitForm($event) {
    this.userService.updateUser({ info: this.form });
    if (this.userService.getUser().hasCompletedForm) {
      this.router.navigateByUrl("/confirmation");
    } else {
      this.router.navigateByUrl("/more-info");
    }
  }
}
