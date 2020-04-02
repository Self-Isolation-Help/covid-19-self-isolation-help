import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ShareLocationPage } from "./share-location.page";

const routes: Routes = [
  {
    path: "",
    component: ShareLocationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareLocationPageRoutingModule {}
