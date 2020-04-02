import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs/internal/Observable";
import { Isolator } from "../models/isolator.model";
import { Volunteer } from "../models/volunteer";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { combineLatest, flatMap, map, take } from "rxjs/operators";
import { AngularFireFunctions } from "@angular/fire/functions";
@Component({
  selector: "app-volunteer",
  templateUrl: "./volunteer.page.html",
  styleUrls: ["./volunteer.page.scss"],
})
export class VolunteerPage implements OnInit {
  volunteer$: Observable<Volunteer>;
  id: string;
  notes: string;
  userUid: string;
  volunteerNotes$: Observable<any>;
  volunteerEmail: string;
  isolator: any;

  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private auth: AngularFireAuth,
    private fns: AngularFireFunctions
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params.id;
      this.getVolunteer(params.id)
        .pipe(take(1))
        .subscribe((volunteer: Volunteer) => {
          this.volunteerEmail = volunteer.details.email;
        });
      this.subscribeNotes(params.id);
    });
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userUid = user.uid;
      }
    });
  }

  getVolunteer(id) {
    return (this.volunteer$ = this.afs
      .collection<Isolator>("volunteers")
      .doc<Volunteer>(this.id)
      .valueChanges());
  }

  subscribeNotes(id) {
    this.afs
      .collection<Volunteer>("volunteers")
      .valueChanges({ idField: "id" })
      .pipe(take(1))
      .subscribe((volunteers) => {
        this.volunteerNotes$ = this.afs
          .collection<Volunteer>("volunteers")
          .doc<Volunteer>(this.id)
          .collection("notes", (ref) => ref.orderBy("created", "asc"))
          .valueChanges({ idField: "id" })
          .pipe(
            map((notes: any) => {
              return notes.map((note) => {
                note.user = volunteers.find((volunteer) => {
                  return volunteer.id === note.userUid;
                });
                return note;
              });
            })
          );
      });
  }

  onRemoveNote(noteId) {
    this.afs
      .collection<Isolator>("volunteers")
      .doc<Volunteer>(this.id)
      .collection("notes")
      .doc(noteId)
      .delete();
  }

  onReject() {
    this.afs.collection<Isolator>("volunteers").doc(this.id).update({
      rejected: true,
    });
    this.router.navigate(["/approve-volunteers"]);
  }

  onApprove() {
    this.afs
      .collection<Isolator>("volunteers")
      .doc(this.id)
      .update({
        roles: {
          volunteer: true,
        },
      })
      .then(() => {
        this.fns
          .httpsCallable("volunteerConfirmationEmail")({
            email: this.volunteerEmail,
          })
          .subscribe();
      });
  }

  onSubmitNotes() {
    this.afs
      .collection<Isolator>("volunteers")
      .doc(this.id)
      .collection("notes")
      .add({
        userUid: this.userUid,
        note: this.notes,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
    this.notes = "";
  }
  async onClickReject() {
    const alert = await this.alertController.create({
      header: "Confirm Resolve",
      message: "Are you sure you want to REJECT this volunteer?",
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
            this.onReject();
          },
        },
      ],
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
          cssClass: "secondary",
        },
        {
          text: "Confirm",
          cssClass: "danger",
          handler: () => {
            this.onApprove();
          },
        },
      ],
    });

    await alert.present();
  }
}
