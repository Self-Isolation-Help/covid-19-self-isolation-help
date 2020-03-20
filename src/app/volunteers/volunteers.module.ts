import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteersPageRoutingModule } from './volunteers-routing.module';

import { VolunteersPage } from './volunteers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteersPageRoutingModule
  ],
  declarations: [VolunteersPage]
})
export class VolunteersPageModule {}
