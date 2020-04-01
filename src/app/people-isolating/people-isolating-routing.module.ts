import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PeopleIsolatingPage } from "./people-isolating.page";

const routes: Routes = [
  {
    path: "",
    component: PeopleIsolatingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleIsolatingPageRoutingModule {}
