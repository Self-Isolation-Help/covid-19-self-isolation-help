import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Isolator } from "../models/isolator.model";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-isolator",
  templateUrl: "./isolator.page.html",
  styleUrls: ["./isolator.page.scss"],
})
export class IsolatorPage implements OnInit {
  isolator: any;
  id: string;
  userUid: string;
  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params.id;
      this.getIsolator(params.id);
    });

    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userUid = user.uid;
      }
    });
  }

  getIsolator(id) {
    this.afs
      .collection<Isolator>("isolating")
      .doc(id)
      .valueChanges()
      .subscribe((resp) => {
        this.isolator = resp;
      });
  }

  async onClickResolve() {
    const alert = await this.alertController.create({
      header: "Confirm Resolve",
      message:
        "Are you sure you want to mark this self-isolator as resolved? This will remove them from the list.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Confirm",
          cssClass: "danger",
          handler: () => {
            this.onResolve();
          },
        },
      ],
    });

    await alert.present();
  }

  onResolve() {
    this.afs.collection<Isolator>("isolating").doc(this.id).update({
      resolved: true,
      lastUpdatedBy: this.userUid,
      lastUpdatedTime: firebase.firestore.FieldValue.serverTimestamp(),
    });
    this.router.navigate(["/people-isolating-grouped"], {
      queryParams: { county: this.isolator.details.county },
    });
  }

  onInProgress() {
    this.afs.collection<Isolator>("isolating").doc(this.id).update({
      inProgress: true,
      lastUpdatedBy: this.userUid,
      lastUpdatedTime: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  onClickRemoveInProgress() {
    this.afs.collection<Isolator>("isolating").doc(this.id).update({
      inProgress: false,
    });
  }

  async onClickInProgress() {
    const alert = await this.alertController.create({
      header: "Confirm Resolve",
      message:
        "Are you sure you want to mark this isolator as IN PROGRESS? This will update their cards so that other volunteers can see they are already in the process of being assisted",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Confirm",
          cssClass: "danger",
          handler: () => {
            this.onInProgress();
          },
        },
      ],
    });

    await alert.present();
  }
}
