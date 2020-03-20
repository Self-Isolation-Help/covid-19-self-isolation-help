import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeopleIsolatingGroupedPageRoutingModule } from './people-isolating-grouped-routing.module';

import { PeopleIsolatingGroupedPage } from './people-isolating-grouped.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      NgPipesModule,
    PeopleIsolatingGroupedPageRoutingModule
  ],
  declarations: [PeopleIsolatingGroupedPage],
    providers: [AngularFirestore]
})
export class PeopleIsolatingGroupedPageModule {}
