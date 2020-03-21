import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtendOperationsPageRoutingModule } from './extend-operations-routing.module';

import { ExtendOperationsPage } from './extend-operations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtendOperationsPageRoutingModule
  ],
  declarations: [ExtendOperationsPage]
})
export class ExtendOperationsPageModule {}
