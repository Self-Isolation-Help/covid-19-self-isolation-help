import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs/internal/Observable";
import { ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Isolator } from '../models/isolator.model';

@Component({
  selector: "app-people-isolating-grouped",
  templateUrl: "./people-isolating-grouped.page.html",
  styleUrls: ["./people-isolating-grouped.page.scss"]
})
export class PeopleIsolatingGroupedPage implements OnInit {
  isolators$: Observable<Array<Isolator>>;
  type: string;
  location: string;
  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = Object.keys(params)[0];
      this.location = params[this.type] ;
      this.getLocation(this.location);
    });
  }

  getLocation(location) {
    this.isolators$ = this.afs
      .collection<Isolator>("isolating", ref =>
        ref.where(`details.${this.type}`, "==", location)
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
