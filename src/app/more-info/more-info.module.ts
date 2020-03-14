import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreInfoPageRoutingModule } from './more-info-routing.module';

import { MoreInfoPage } from './more-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreInfoPageRoutingModule
  ],
  declarations: [MoreInfoPage]
})
export class MoreInfoPageModule {}
