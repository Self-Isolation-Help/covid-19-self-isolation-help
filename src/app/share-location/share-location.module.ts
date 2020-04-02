import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ShareLocationPageRoutingModule } from "./share-location-routing.module";

import { ShareLocationPage } from "./share-location.page";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareLocationPageRoutingModule,
  ],
  providers: [Geolocation],
  declarations: [ShareLocationPage],
})
export class ShareLocationPageModule {}
