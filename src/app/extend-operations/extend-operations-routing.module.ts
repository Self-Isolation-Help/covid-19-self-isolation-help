import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtendOperationsPage } from './extend-operations.page';

const routes: Routes = [
  {
    path: '',
    component: ExtendOperationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtendOperationsPageRoutingModule {}
