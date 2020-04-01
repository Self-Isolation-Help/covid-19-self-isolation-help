import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IsolatorPage } from "./isolator.page";

const routes: Routes = [
  {
    path: "",
    component: IsolatorPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IsolatorPageRoutingModule {}
