import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";

import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { isDevMode } from "@angular/core";
import * as firebase from "firebase";
import { AngularFireFunctions } from "@angular/fire/functions";
import { MatchService } from "../match.service";
import { Isolator } from "../models/isolator.model";
import { take } from "rxjs/operators";
import { Volunteer } from "../models/volunteer";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.page.html",
  styleUrls: ["./confirmation.page.scss"]
})
export class ConfirmationPage implements OnInit {
  user;
  disabled = false;
  isDevMode: boolean;
  constructor(
    public userService: UserService,
    private afs: AngularFirestore,
    private router: Router,
    private fns: AngularFireFunctions,
    private matchService: MatchService
  ) {}

  ngOnInit() {
    this.userService.updateUser({ hasCompletedForm: true });
    this.user = this.userService.getUser();
    this.isDevMode = isDevMode();
  }

  getVolunteers() {
    return this.afs.collection("volunteers").valueChanges();
  }

  onComplete() {
    const id = this.afs.createId();
    this.disabled = true;
    this.userService.updateUser({
      dateSubmitted: firebase.firestore.FieldValue.serverTimestamp()
    });
    this.afs
      .collection("isolating")
      .doc(id)
      .set(this.userService.getUser())
      .then(() => {
        const user = this.userService.getUser();
        this.router.navigateByUrl("/complete");
        this.getVolunteers()
          .pipe(take(1))
          .subscribe((volunteers: Array<Volunteer>) => {
            this.distributeEmailsToVolunteers(user, volunteers, id);
          });
      });
  }

  distributeEmailsToVolunteers(
    isolator: Isolator,
    volunteers: Array<Volunteer>,
    id
  ) {
    let emails = [];
    const adminsOrSuperVolunteers = volunteers.filter(
      volunteer =>
        volunteer.roles &&
        (volunteer.roles.admin || volunteer.roles.superVolunteer)
    );
    const matchingVolunteers = this.matchService.matchVolunteersWithIsolator(
      isolator,
      volunteers
    );
    const volunteersTosendEmailTo = [
      ...adminsOrSuperVolunteers,
      ...matchingVolunteers.filter(
        volunteer => volunteer.roles.volunteer === true
      )
    ];
    volunteersTosendEmailTo.forEach((matchingVolunteer: Volunteer) => {
      emails.push(matchingVolunteer.details.email)
    });

    this.fns
      .httpsCallable("sendEmailToVolunteersMatchingIsolator")({
        emails: emails,
        isolator: { ...isolator, ...{ id: id } }
      })
      .subscribe();

  }
}
