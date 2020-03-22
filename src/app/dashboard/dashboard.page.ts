import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  constructor(
    private afs: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {}

  onSignout() {
    this.router.navigate(["/"]);
    this.auth.signOut();
  }
}
