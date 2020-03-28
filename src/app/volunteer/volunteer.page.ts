import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs/internal/Observable";
import { Isolator } from "../models/isolator.model";
import { Volunteer } from "../models/volunteer";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-volunteer",
  templateUrl: "./volunteer.page.html",
  styleUrls: ["./volunteer.page.scss"]
})
export class VolunteerPage implements OnInit {
  volunteer$: Observable<Volunteer>;
  id: string;
  userUid: string;

  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    public auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.getVolunteer(params.id);
    });
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userUid = user.uid;
      }
    });
  }

  getVolunteer(id) {
    this.volunteer$ = this.afs
      .collection<Isolator>("volunteers")
      .doc<Volunteer>(this.id)
      .valueChanges();
  }

  onReject() {
    this.afs
      .collection<Isolator>("volunteers")
      .doc(this.id)
      .update({
        rejected: true
      });
    this.router.navigate(["/approve-volunteers"]);
  }

  onApprove() {
    this.afs
      .collection<Isolator>("volunteers")
      .doc(this.id)
      .update({
        roles: {
          volunteer: true
        }
      });
  }

  onClickInProgress() {
    this.afs
      .collection<Isolator>("volunteers")
      .doc(this.id)
      .update({
        inProgress: {
          inProgress: true,
          lastUpdatedBy: this.userUid,
          lastUpdatedTime: firebase.firestore.FieldValue.serverTimestamp()
        }
      });
  }

  onClickRemoveInProgress() {
    this.afs
      .collection<Isolator>("volunteers")
      .doc(this.id)
      .update({
        inProgress: {
          inProgress: false,
          lastUpdatedBy: this.userUid,
          lastUpdatedTime: firebase.firestore.FieldValue.serverTimestamp()
        }
      });
  }

  async onClickReject() {
    const alert = await this.alertController.create({
      header: "Confirm Resolve",
      message: "Are you sure you want to REJECT this volunteer?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary"
        },
        {
          text: "Confirm",
          cssClass: "danger",
          handler: () => {
            this.onReject();
          }
        }
      ]
    });

    await alert.present();
  }

  async onClickApprove() {
    const alert = await this.alertController.create({
      header: "Confirm Resolve",
      message: "Are you sure you want to APPROVE this volunteer?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary"
        },
        {
          text: "Confirm",
          cssClass: "danger",
          handler: () => {
            this.onApprove();
          }
        }
      ]
    });

    await alert.present();
  }
}
