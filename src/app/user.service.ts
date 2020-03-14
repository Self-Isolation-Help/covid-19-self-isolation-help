import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  user:any = {};

  constructor() {
    console.log("user service");
  }

  updateUser(object) {
    this.user = { ...this.user, ...object };
  }

  getUser() {
    return this.user;
  }
}
