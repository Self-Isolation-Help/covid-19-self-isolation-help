import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveVolunteersPageRoutingModule } from './approve-volunteers-routing.module';

import { ApproveVolunteersPage } from './approve-volunteers.page';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveVolunteersPageRoutingModule
  ],
  declarations: [ApproveVolunteersPage],
    providers: [AngularFirestore]
})
export class ApproveVolunteersPageModule {}
