//import { Volunteer } from "./../../../../../covid-19-self-isolation-help/src/app/models/volunteer";
import { VolunteerRole } from "./../models/volunteer-role.enum";
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
  volunteerLocations: [string] = ["None"];
  isAdmin: boolean;
  volloc: string = "all";
  constructor(
    private afs: AngularFirestore,

    public auth: AngularFireAuth,
    private router: Router
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

    this.user$.subscribe(user => {
      if (user) {
        this.isAdmin = this.checkAdmin(user);
        if (!this.isAdmin) {
          this.volunteerLocations = this.filterLoc(user);
          this.volloc = this.volunteerLocations.join();
        }
      }
    });

    this.isolators$ = this.afs
      .collection<Isolator>("isolating")
      .valueChanges()
      .pipe(
        map((isolators: any) => {
          return this.filterByRole(isolators);
        })
      );
  }

  filterByRole(isolators) {
    if (this.isAdmin) {
      return this.filterIsolatorForAdmin(isolators);
    } else {
      return this.filterIsolatorForVolunteer(isolators);
    }
  }

  filterIsolatorForVolunteer(isolators) {
    return isolators.filter(
      isolator =>
        !isolator.resolved &&
        (this.volunteerLocations.includes(isolator.details.county) ||
          this.volunteerLocations.includes(isolator.details.location))
    );
  }

  filterIsolatorForAdmin(isolators) {
    return isolators.filter(isolator => !isolator.resolved);
  }

  filterLoc(user) {
    if (!this.checkAdmin(user)) {
      if (user.workingLocations != undefined) {
        return user.workingLocations;
      } else if (user.workingCounties != undefined) {
        return user.workingCounties;
      } else {
        return [user.details.county];
      }
    }
    return ["all"];
  }

  checkAdmin(user) {
    if (user != undefined) {
      if (user.roles.admin == undefined) {
        return false;
      }
      return true;
    }
  }

  onSignout() {
    this.router.navigate(["/"]);
    this.auth.signOut();
  }
}
