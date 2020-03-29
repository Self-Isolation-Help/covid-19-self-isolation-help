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
        console.log("this user has the county : " + user.details.county);
        this.fillWorkingLocations(user);
      }
      this.volunteerLocations.forEach(element => {
        console.log("volunteerlocs: " + element);
      });
    });

    this.isolators$ = this.afs
      .collection<Isolator>("isolating")
      .valueChanges()
      .pipe(
        map((isolators: any) => {
          return isolators.filter(
            isolator =>
              !isolator.resolved &&
              (this.volunteerLocations.includes(isolator.details.county) ||
                this.volunteerLocations.includes(isolator.details.location))
          );
        })
      );
  }

  fillWorkingLocations(user) {
    var GLondon = "Greater London";
    console.log("user county is " + user.details.county);
    this.volunteerLocations.push(user.details.county);
    if (user.details.county == GLondon) {
      console.log("we are in greater london");
      if (user.workingLocations != undefined) {
        console.log("workign locations aren't undefined");
        user.workingLocations.forEach(element => {
          this.volunteerLocations.push(element);
          console.log("working location: " + element);
        });
      } else {
        console.log("we are doing working counties, must not have locations");
        if (user.workingCounties != undefined) {
          this.volunteerLocations.splice(0, 2);
          user.workingCounties.forEach(element => {
            this.volunteerLocations.push(element);
            console.log("working county: " + element);
          });
        }
      }
    }
  }

  onSignout() {
    this.router.navigate(["/"]);
    this.auth.signOut();
  }
}
