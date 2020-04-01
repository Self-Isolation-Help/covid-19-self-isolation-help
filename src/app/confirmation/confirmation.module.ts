import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ConfirmationPageRoutingModule } from "./confirmation-routing.module";

import { ConfirmationPage } from "./confirmation.page";
import { AngularFirestore } from "@angular/fire/firestore";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmationPageRoutingModule,
  ],
  declarations: [ConfirmationPage],
  providers: [AngularFirestore],
})
export class ConfirmationPageModule {}
