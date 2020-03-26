import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveVolunteersPage } from './approve-volunteers.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveVolunteersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveVolunteersPageRoutingModule {}
