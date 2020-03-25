import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs/internal/Observable";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Isolator } from '../models/isolator.model';

@Component({
  selector: "app-isolator",
  templateUrl: "./isolator.page.html",
  styleUrls: ["./isolator.page.scss"]
})
export class IsolatorPage implements OnInit {
  isolator: any;
  id: string;
  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.getIsolator(params.id);
    });
  }

  getIsolator(id) {
    this.afs
      .collection<Isolator>("isolating")
      .doc(id)
      .valueChanges()
      .subscribe(resp => {
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
          cssClass: "secondary"
        },
        {
          text: "Confirm",
          cssClass: "danger",
          handler: () => {
            this.onResolve();
          }
        }
      ]
    });

    await alert.present();
  }

  onResolve() {
    this.afs
      .collection<Isolator>("isolating")
      .doc(this.id)
      .update({
        resolved: true
      });
    this.router.navigate(["/people-isolating-grouped"], {
      queryParams: { county: this.isolator.details.county }
    });
  }

  onInProgress() {
    this.afs
      .collection<Isolator>("isolating")
      .doc(this.id)
      .update({
        inProgress: true
      });
  }

  onClickRemoveInProgress() {
    this.afs
      .collection<Isolator>("isolating")
      .doc(this.id)
      .update({
        inProgress: false
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
          cssClass: "secondary"
        },
        {
          text: "Confirm",
          cssClass: "danger",
          handler: () => {
            this.onInProgress();
          }
        }
      ]
    });

    await alert.present();
  }
}
