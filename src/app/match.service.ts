import { Injectable } from "@angular/core";
import { Isolator } from "./models/isolator.model";
import { Volunteer } from "./models/volunteer";

@Injectable({
  providedIn: "root"
})
export class MatchService {
  constructor() {}
  matchIsolatorsWithVolunteer(
    volunteer: Volunteer,
    isolators: Array<Isolator>
  ) {
    return isolators.filter(
      isolator =>
        (!volunteer.workingLocations &&
          volunteer.workingCounties.includes(isolator.details.county)) ||
        (volunteer.workingLocations &&
          volunteer.workingLocations.includes(
            isolator.details.selectedLocation && isolator.details.selectedLocation.name
          ))
    );
  }
}
