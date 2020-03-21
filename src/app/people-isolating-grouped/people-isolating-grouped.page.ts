import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs/internal/Observable";
import { Isolator } from "../isolator.model";
import { ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-people-isolating-grouped",
  templateUrl: "./people-isolating-grouped.page.html",
  styleUrls: ["./people-isolating-grouped.page.scss"]
})
export class PeopleIsolatingGroupedPage implements OnInit {
  isolators$: Observable<Array<Isolator>>;
  county: string;
  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.county = params.county;
      this.getByCounty(params.county);
    });
  }

  getByCounty(county) {
    this.isolators$ = this.afs
      .collection<Isolator>("isolating", ref =>
        ref.where("details.county", "==", county)
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
