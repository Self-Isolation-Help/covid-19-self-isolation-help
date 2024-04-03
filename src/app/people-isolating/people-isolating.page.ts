import { MatchService } from "./../match.service";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs/internal/Observable";
import { map, switchMap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Isolator } from "../models/isolator.model";
import { Volunteer } from "../models/volunteer";

@Component({
  selector: "app-people-isolating",
  templateUrl: "./people-isolating.page.html",
  styleUrls: ["./people-isolating.page.scss"]
})
export class PeopleIsolatingPage implements OnInit {
  isolators$: Observable<Array<Isolator>>;
  user$: Observable<Volunteer>;
  volunteer: Volunteer;
  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router,
    private matchservice: MatchService
  ) {}

  ngOnInit() {
    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs
            .doc<Volunteer>(`volunteers/${user.uid}`)
            .valueChanges();
        }
      })
    );
    this.isolators$ = this.afs
      .collection<Isolator>("isolating")
      .valueChanges()
      .pipe(
        map((isolators: any) => {
          if (this.volunteer.roles && this.volunteer.roles["volunteer"]) {
            return this.matchservice.matchIsolatorsWithVolunteer(
              this.volunteer,
              isolators
            );
          } else {
            return isolators.filter(isolator => !isolator.resolved);
          }
        })
      );

    this.user$.subscribe(user => {
      if (user) {
        this.volunteer = user;
      }
    });
  }

  onSignout() {
    this.router.navigate(["/"]);
    this.auth.signOut();
  }
}
