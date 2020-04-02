import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-more-info",
  templateUrl: "./more-info.page.html",
  styleUrls: ["./more-info.page.scss"]
})
export class MoreInfoPage implements OnInit {
  form: any = {};

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (this.userService.user.moreInfo) {
      this.form = {
        moreInfo: this.userService.user.moreInfo
      };
    }
  }

  onSubmitForm($event) {
    this.userService.updateUser(this.form);
    if (this.userService.getUser().hasCompletedForm) {
      this.router.navigateByUrl("/confirmation");
    } else {
      this.router.navigateByUrl("/address");
    }
  }
}
