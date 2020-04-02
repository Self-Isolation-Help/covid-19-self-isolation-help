import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { COUNTIES } from "../counties";
import { LOCATIONS } from "../locations";
import { COUNTIES_LOCATION_MAP } from "../counties-location-map";
import { SubdomainService } from "../subdomain.service";
import { Volunteer } from "../models/volunteer";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { NgForm } from "@angular/forms";
import * as firebase from "firebase";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"]
})
export class SignUpPage implements OnInit {
  form: Volunteer;
  password: string;
  confirmedPassword: string;
  counties: string[] = COUNTIES.sort();
  locations = LOCATIONS.sort();
  countiesLocationMap = COUNTIES_LOCATION_MAP;
  locationGroups = [];
  subdomain;
  submitted = false;
  submitting = false;
  error: string;

  constructor(
    private router: Router,
    private subdomainService: SubdomainService,
    private auth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.form = {
      details: {},
      volunteerGroup: {},
      checks: {},
      roles: {}
    } as Volunteer;
  }

  ngOnInit() {
    this.subdomain = this.subdomainService.getLabelForSubdomain();
    this.form.details.county = this.subdomainService.getCountyBySubdomain();
  }

  onChangeTown() {
    if (this.form.details.town.toLowerCase() === "london") {
      this.form.details.county = "Greater London";
    } else {
      delete this.form.details.county;
    }
  }

  onChangeCounty() {
    if (this.form.details.county) {
      this.form.workingCounties = [this.form.details.county];
    } else {
      delete this.form.workingCounties;
    }
  }

  onChangeWorkingCounty() {
    this.locationGroups = this.countiesLocationMap
      .filter(filter => this.form.workingCounties.includes(filter.county))
      .map(map => {
        return {
          ...map,
          ...{
            items: this.locations.find(
              location => location.county === map.county
            ).items
          }
        };
      });
  }

  onSubmitForm($event, ngForm: NgForm) {
    this.error = "";
    this.form.dateCreated = firebase.firestore.FieldValue.serverTimestamp();
    this.submitted = true;
    if (
      ngForm.form.valid &&
      this.form.checks.disclaimerSigned &&
      this.password === this.confirmedPassword
    ) {
      this.submitting = true;
      this.auth
        .createUserWithEmailAndPassword(this.form.details.email, this.password)
        .then(newFireStoreUser => {
          this.afs
            .doc(`volunteers/${newFireStoreUser.user.uid}`)
            .set(this.form)
            .then(() => {
              this.router.navigate(["/people-isolating"]);
            });
        })
        .catch(error => {
          this.submitting = false;
          this.error = error.message;
        });
    } else {
    }
  }
}
