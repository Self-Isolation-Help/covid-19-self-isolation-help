import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DashboardPageRoutingModule } from "./dashboard-routing.module";

import { DashboardPage } from "./dashboard.page";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DashboardPageRoutingModule],
  declarations: [DashboardPage],
  providers: [AngularFirestore, AngularFireAuth]
})
export class DashboardPageModule {}
