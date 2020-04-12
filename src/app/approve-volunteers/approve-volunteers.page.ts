import { Component, OnInit } from "@angular/core";
import { Isolator } from "../models/isolator.model";
import { map } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import { Volunteer } from "../models/volunteer";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-approve-volunteers",
  templateUrl: "./approve-volunteers.page.html",
  styleUrls: ["./approve-volunteers.page.scss"],
})
export class ApproveVolunteersPage implements OnInit {
  volunteers$: Observable<Volunteer>;
  volunteersNeedApproval: Array<Volunteer>;
  volunteersAlreadyApproved: Array<Volunteer>;
  showEmails = false;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.volunteers$ = this.afs
      .collection<Isolator>("volunteers", (ref) =>
        ref.orderBy("dateCreated", "asc")
      )
      .valueChanges({ idField: "id" })
      .pipe(
        map((volunteers: any) => {
          return volunteers.filter(
            (volunteer) => volunteer.approved !== false && !volunteer.rejected
          );
        })
      );

    this.volunteers$.subscribe((volunteers: any) => {
      this.volunteersNeedApproval = volunteers.filter(
        (volunteer) =>
          volunteer.roles &&
          !volunteer.roles.admin &&
          !volunteer.roles.volunteer
      );
      this.volunteersAlreadyApproved = volunteers.filter(
        (volunteer) =>
          volunteer.roles &&
          (volunteer.roles.admin || volunteer.roles.volunteer)
      );
    });
  }
}
