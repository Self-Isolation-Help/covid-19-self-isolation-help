import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PeopleIsolatingPageRoutingModule } from "./people-isolating-routing.module";

import { PeopleIsolatingPage } from "./people-isolating.page";
import { AngularFirestore } from "@angular/fire/firestore";
import { NgPipesModule } from 'ngx-pipes';
import { AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeopleIsolatingPageRoutingModule,
      NgPipesModule
  ],
  declarations: [PeopleIsolatingPage],
  providers: [AngularFirestore, AngularFireAuth]
})
export class PeopleIsolatingPageModule {}
