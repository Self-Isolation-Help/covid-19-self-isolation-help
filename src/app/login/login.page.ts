import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import { isDevMode } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  form: any = {};
  error;
  loading = false;

  isDevMode: boolean;

  constructor(public auth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.isDevMode = isDevMode();
  }

  signin() {
    this.loading = true;
    this.auth
      .signInWithEmailAndPassword(this.form.email, this.form.password)
      .then(resp => {
        this.error = false;
        this.router.navigate(["/people-isolating"]);
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
