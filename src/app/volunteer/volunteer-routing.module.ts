import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerPage } from './volunteer.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerPageRoutingModule {}
