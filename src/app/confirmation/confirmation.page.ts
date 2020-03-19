import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";

import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import 'firebase/firestore';
import * as firebase from 'firebase';

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.page.html",
  styleUrls: ["./confirmation.page.scss"]
})
export class ConfirmationPage implements OnInit {
  user;
  disabled = false;

  constructor(
    public userService: UserService,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.updateUser({ hasCompletedForm: true });
    this.user = this.userService.getUser();
  }

  onComplete() {
    this.disabled = true;
    this.userService.updateUser({dateSubmitted: firebase.firestore.FieldValue.serverTimestamp()});
    this.afs
      .collection("isolating")
      .add(this.userService.getUser())
      .then(() => {
        this.router.navigateByUrl("/complete");
      });
  }
}