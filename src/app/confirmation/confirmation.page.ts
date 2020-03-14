import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  user;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.updateUser({hasCompletedForm: true});
    this.user = this.userService.getUser();
  }

}
