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
    return isolators.filter(isolator => {
      return (
        (!volunteer.workingLocations &&
          volunteer.workingCounties.includes(isolator.details.county)) ||
        (volunteer.workingLocations &&
          volunteer.workingLocations.includes(
            isolator.details.selectedLocation &&
              isolator.details.selectedLocation.name
          ) &&
          !isolator.resolved)
      );
    });
  }

  matchVolunteersWithIsolator(
    isolator: Isolator,
    volunteers: Array<Volunteer>
  ) {
    const test = volunteers.filter(volunteer => {
      if (!isolator.details.selectedLocation) {
        return volunteer.workingCounties && volunteer.workingCounties.includes(isolator.details.county);
      }
      if (
        isolator.details.selectedLocation &&
        isolator.details.selectedLocation.name
      ) {
        return (
          volunteer.workingLocations &&
          volunteer.workingLocations.includes(
            isolator.details.selectedLocation.name
          )
        );
      }
    });
    return test;
  }
}
