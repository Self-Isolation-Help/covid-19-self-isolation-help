import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },

  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "privacy-policy",
    loadChildren: () =>
      import("./privacy-policy/privacy-policy.module").then(
        m => m.PrivacyPolicyPageModule
      )
  },
  {
    path: "share-location",
    loadChildren: () =>
      import("./share-location/share-location.module").then(
        m => m.ShareLocationPageModule
      )
  },
  {
    path: "question-one",
    loadChildren: () =>
      import("./question-one/question-one.module").then(
        m => m.QuestionOnePageModule
      )
  },
  {
    path: "info",
    loadChildren: () => import("./info/info.module").then(m => m.InfoPageModule)
  },
  {
    path: "address",
    loadChildren: () =>
      import("./address/address.module").then(m => m.AddressPageModule)
  },
  {
    path: "more-info",
    loadChildren: () =>
      import("./more-info/more-info.module").then(m => m.MoreInfoPageModule)
  },
  {
    path: "confirmation",
    loadChildren: () =>
      import("./confirmation/confirmation.module").then(
        m => m.ConfirmationPageModule
      )
  },
  {
    path: "complete",
    loadChildren: () =>
      import("./complete/complete.module").then(m => m.CompletePageModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "people-isolating",
    loadChildren: () =>
      import("./people-isolating/people-isolating.module").then(
        m => m.PeopleIsolatingPageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
