import { Volunteer } from "./../../../../gina/covid-19-self-isolation-help/src/app/models/volunteer";
import { MatchService } from "./../match.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs/internal/Observable";
import { ActivatedRoute } from "@angular/router";
import { filter, map, concatMap } from "rxjs/operators";
import { Isolator } from "../models/isolator.model";

@Component({
  selector: "app-people-isolating-grouped",
  templateUrl: "./people-isolating-grouped.page.html",
  styleUrls: ["./people-isolating-grouped.page.scss"]
})
export class PeopleIsolatingGroupedPage implements OnInit {
  isolators$: Observable<Array<Isolator>>;
  type: string;
  location: string;
  matches: Array<Isolator>;
  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private matchservice: MatchService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = Object.keys(params)[0];
      this.location = params[this.type];
      this.getLocation(this.location);
      this.matchIsolators();
    });
  }

  matchIsolators() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.afs
          .doc<Volunteer>(`volunteers/${user.uid}`)
          .valueChanges()
          .subscribe(volunteer =>
            this.isolators$.subscribe(isolators => {
              volunteer.roles && volunteer.roles["volunteer"]
                ? (this.matches = this.matchservice.matchIsolatorsWithVolunteer(
                    volunteer,
                    isolators
                  ))
                : (this.matches = isolators.filter(
                    isolator => !isolator.resolved
                  ));
            })
          );
      }
    });
  }

  getLocation(location) {
    this.isolators$ = this.afs
      .collection<Isolator>("isolating", ref =>
        ref
          .where(`details.${this.type}`, "==", location)
          .orderBy("dateSubmitted", "asc")
      )
      .valueChanges({ idField: "id" })
      .pipe(
        map((isolators: any) => {
          return isolators.filter(isolator => !isolator.resolved);
        })
      );
  }
}
