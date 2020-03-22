import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Isolator } from "../isolator.model";
import { Observable } from "rxjs/internal/Observable";
import { map, switchMap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Volunteer } from '../volunteer';

@Component({
  selector: "app-people-isolating",
  templateUrl: "./people-isolating.page.html",
  styleUrls: ["./people-isolating.page.scss"]
})
export class PeopleIsolatingPage implements OnInit {
  isolators$: Observable<Array<Isolator>>;
  user$: Observable<Volunteer>;

  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<Volunteer>(`user/${user.uid}`).valueChanges();
        }
      }));
  }

  ngOnInit() {
    this.isolators$ = this.user$.pipe(
      map(user => user.counties),
      switchMap((counties) => {
        return this.afs
          .collection<Isolator>("isolating")
          .valueChanges()
          .pipe(
            map((isolators: Isolator[]) => {
              return isolators.filter(isolator => !isolator.resolved
              && (counties.includes('*') || counties.includes(isolator.details.county)));
            }));
      }));
  }

  onSignout() {
    this.router.navigate(["/"]);
    this.auth.signOut();
  }
}
