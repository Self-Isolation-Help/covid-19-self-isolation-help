import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Isolator } from "../models/isolator.model";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { Volunteer } from "../models/volunteer";
import { Observable } from "rxjs/internal/Observable";
import { filter, map, take, tap } from "rxjs/operators";
import { MatchService } from "../match.service";
import { AngularFireFunctions } from "@angular/fire/functions";

@Component({
  selector: "app-isolator",
  templateUrl: "./isolator.page.html",
  styleUrls: ["./isolator.page.scss"]
})
export class IsolatorPage implements OnInit {
  isolator: any;
  id: string;
  userUid: string;
  matchingVolunteers$;
  volunteers: Array<Volunteer>;
  disableEmailButton = false;
  isolatorUpdatedBy: Volunteer;

  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private matchService: MatchService,
    private fns: AngularFireFunctions
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe(async user => {
      if (user) {
        this.userUid = user.uid;
        await this.getQueryParams();
        await this.getLoggedInUser().subscribe((user: Volunteer) => {
          user.roles.admin &&
            this.getMatchingVolunteers().subscribe(
              (volunteers: Array<Volunteer>) => {
                this.volunteers = volunteers.filter(
                  volunteer => volunteer.roles && volunteer.roles.volunteer
                );
              }
            );
        });
      }
    });
  }

  getMatchingVolunteers(): Observable<Array<Volunteer>> {
    return (this.matchingVolunteers$ = this.afs
      .collection("volunteers")
      .valueChanges({ idField: "id" })
      .pipe(
        tap(volunteers => {
          if (this.isolator.lastUpdatedBy) {
            this.isolatorUpdatedBy = volunteers.find(
              volunteer => volunteer.id === this.isolator.lastUpdatedBy
            );
            console.log(this.isolatorUpdatedBy);
          }
        }),
        map(volunteers =>
          this.matchService.matchVolunteersWithIsolator(
            this.isolator,
            volunteers
          )
        )
      ));
  }

  getQueryParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      this.getIsolator(params.id);
    });
  }

  getLoggedInUser() {
    return this.afs
      .collection<Volunteer>("volunteers")
      .doc(this.userUid)
      .valueChanges();
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

  async triggerEmail() {
    const alert = await this.alertController.create({
      header: "Confirm Resolve",
      message: "Confirm trigger sending email to matching volunteers?",
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
            this.sendNotificationEmail(this.isolator, this.volunteers, this.id);
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
        resolved: true,
        lastUpdatedBy: this.userUid,
        lastUpdatedTime: firebase.firestore.FieldValue.serverTimestamp()
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
        inProgress: true,
        lastUpdatedBy: this.userUid,
        lastUpdatedTime: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  onClickRemoveInProgress() {
    this.afs
      .collection<Isolator>("isolating")
      .doc(this.id)
      .update({
        lastUpdatedBy: this.userUid,
        lastUpdatedTime: firebase.firestore.FieldValue.serverTimestamp(),
        inProgress: false
      });
  }

  onClickTriggerNotification() {
    this.triggerEmail();
  }

  sendNotificationEmail(isolator: Isolator, volunteers: Array<Volunteer>, id) {
    let emails = [];
    const adminsOrSuperVolunteers = volunteers.filter(
      volunteer =>
        volunteer.roles &&
        (volunteer.roles.admin || volunteer.roles.superVolunteer)
    );
    const matchingVolunteers = this.matchService.matchVolunteersWithIsolator(
      isolator,
      volunteers
    );
    const volunteersTosendEmailTo = [
      ...adminsOrSuperVolunteers,
      ...matchingVolunteers.filter(
        volunteer => volunteer.roles && volunteer.roles.volunteer === true
      )
    ];

    this.disableEmailButton = true;
    volunteersTosendEmailTo.forEach((matchingVolunteer: Volunteer) => {
      emails.push(matchingVolunteer.details && matchingVolunteer.details.email);
    });

    this.afs
      .collection<Isolator>("isolating")
      .doc(this.id)
      .update({
        manualVolunteerAlertEmailTriggered: true
      });

    this.fns
      .httpsCallable("sendEmailToVolunteersMatchingIsolator")({
        emails: emails,
        isolator: { ...isolator, ...{ id: id } }
      })
      .subscribe();
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
