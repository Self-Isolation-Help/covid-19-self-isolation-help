import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Isolator } from '../models/isolator.model';

@Component({
  selector: "app-people-isolating",
  templateUrl: "./people-isolating.page.html",
  styleUrls: ["./people-isolating.page.scss"]
})
export class PeopleIsolatingPage implements OnInit {
  isolators$: Observable<Array<Isolator>>;
  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.isolators$ = this.afs
      .collection<Isolator>("isolating")
      .valueChanges()
      .pipe(
        map((isolators: any) => {
          return isolators.filter(isolator => !isolator.resolved);
        })
      );
  }

  onSignout() {
    this.router.navigate(["/"]);
    this.auth.signOut();
  }
}