import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-address",
  templateUrl: "./address.page.html",
  styleUrls: ["./address.page.scss"]
})
export class AddressPage implements OnInit {
  form: any = {};

  constructor(private userService: UserService, private router: Router) {}

    ngOnInit() {
        if (this.userService.user.details) {
            this.form = this.userService.user.details;
        }
    }

  onSubmitForm($event, form) {
    console.log($event, form);

    if(form.form.status !== 'INVALID') {
        this.userService.updateUser({ details: this.form });
        this.router.navigateByUrl("/confirmation");
    }


  }

  onChangeDontShare($event, form) {

      if($event.detail.checked) {
          this.form.address1 = '';
          this.form.address2 = '';
          this.form.town = '';
          this.form.county = '';
          this.form.postCode = '';
      }
  }
}
