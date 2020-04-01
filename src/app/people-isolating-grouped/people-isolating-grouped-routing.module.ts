import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PeopleIsolatingGroupedPage } from "./people-isolating-grouped.page";

const routes: Routes = [
  {
    path: "",
    component: PeopleIsolatingGroupedPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleIsolatingGroupedPageRoutingModule {}
