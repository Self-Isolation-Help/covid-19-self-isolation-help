import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { COUNTIES } from "../counties";
import { LOCATIONS } from "../locations";
import { COUNTIES_LOCATION_MAP } from "../counties-location-map";
import { SubdomainService } from "../subdomain.service";
import { Volunteer } from '../models/volunteer';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"]
})
export class SignUpPage implements OnInit {
  form: Volunteer;
  counties: string[] = COUNTIES.sort();
  locations = LOCATIONS.sort();
  countiesLocationMap = COUNTIES_LOCATION_MAP;
  locationsList = [];
  subdomain;

  constructor(
    private router: Router,
    private subdomainService: SubdomainService,
    private auth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.form = {
      details: {},
      volunteerGroup: {}
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

  onSubmitForm($event, ngForm: NgForm) {
    if (ngForm.form.valid && (ngForm.value as Volunteer).checks.disclaimerSigned) {
    } else {
    }
  }
}
