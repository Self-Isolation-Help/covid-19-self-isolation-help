import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { QuestionOnePageRoutingModule } from "./question-one-routing.module";

import { QuestionOnePage } from "./question-one.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionOnePageRoutingModule
  ],
  declarations: [QuestionOnePage]
})
export class QuestionOnePageModule {}
