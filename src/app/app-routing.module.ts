import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo
} from "@angular/fire/auth-guard";
import "firebase/firestore";
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

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
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    loadChildren: () =>
      import("./people-isolating/people-isolating.module").then(
        m => m.PeopleIsolatingPageModule
      )
  },
  {
    path: "isolator",
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    loadChildren: () =>
      import("./isolator/isolator.module").then(m => m.IsolatorPageModule)
  },
  {
    path: "people-isolating-grouped",
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    loadChildren: () =>
      import("./people-isolating-grouped/people-isolating-grouped.module").then(
        m => m.PeopleIsolatingGroupedPageModule
      )
  },
  {
    path: "volunteers",
    loadChildren: () =>
      import("./volunteers/volunteers.module").then(m => m.VolunteersPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AngularFireAuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
