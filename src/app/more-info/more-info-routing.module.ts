import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreInfoPage } from './more-info.page';

const routes: Routes = [
  {
    path: '',
    component: MoreInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreInfoPageRoutingModule {}
