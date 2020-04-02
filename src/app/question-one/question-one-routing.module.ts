import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { QuestionOnePage } from "./question-one.page";

const routes: Routes = [
  {
    path: "",
    component: QuestionOnePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionOnePageRoutingModule {}
