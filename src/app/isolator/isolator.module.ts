import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { IsolatorPageRoutingModule } from "./isolator-routing.module";

import { IsolatorPage } from "./isolator.page";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireFunctions } from '@angular/fire/functions';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, IsolatorPageRoutingModule],
  declarations: [IsolatorPage],
  providers: [AngularFirestore, AngularFireAuth, AngularFireFunctions],
})
export class IsolatorPageModule {}
