import { TestBed } from "@angular/core/testing";

import { MatchService } from "./match.service";
import { Volunteer } from "./models/volunteer";
import { Isolator } from "./models/isolator.model";

const volunteerOneCountyOnly: Volunteer = {
  details: {
    forename: "Test"
  },
  workingCounties: ["a"]
};

const volunteerMultipleCountiesOnly: Volunteer = {
  details: {
    forename: "Test"
  },
  workingCounties: ["a", "b"]
};

const volunteerOneCountyOneLocation: Volunteer = {
  details: {
    forename: "Test"
  },
  workingCounties: ["a"],
  workingLocations: ["1"]
};

const volunteerMultipleCountiesMultipleLocations: Volunteer = {
  details: {
    forename: "Test"
  },
  workingCounties: ["a", "b"],
  workingLocations: ["1", "2"]
};

const isolators: Array<Isolator> = [
  {
    details: {
      forename: "z",
      county: "a"
    }
  },
  {
    details: {
      forename: "y",
      county: "a",
      selectedLocation: "1"
    }
  },
  {
    details: {
      forename: "x",
      county: "b",
      selectedLocation: "1"
    }
  },
  {
    details: {
      forename: "w",
      county: "b",
      selectedLocation: "2"
    }
  }
];

fdescribe("MatchService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MatchService = TestBed.get(MatchService);
    expect(service).toBeTruthy();
  });

  it("should match isolators by county IF the volunteer has no workingLocations", () => {
    const service: MatchService = TestBed.get(MatchService);
    expect(
      service.matchIsolatorsWithVolunteer(volunteerOneCountyOnly, isolators)
    ).toEqual([
      {
        details: {
          forename: "z",
          county: "a"
        }
      },
      {
        details: {
          forename: "y",
          county: "a",
          selectedLocation: "1"
        }
      }
    ]);

    expect(
      service.matchIsolatorsWithVolunteer(
        volunteerMultipleCountiesOnly,
        isolators
      )
    ).toEqual([
      {
        details: {
          forename: "z",
          county: "a"
        }
      },
      {
        details: {
          forename: "y",
          county: "a",
          selectedLocation: "1"
        }
      },
      {
        details: {
          forename: "x",
          county: "b",
          selectedLocation: "1"
        }
      },
      {
        details: {
          forename: "w",
          county: "b",
          selectedLocation: "2"
        }
      }
    ]);
  });
  it("should match isolators by selectedLocation IF the volunteer has workingLocations", () => {
    const service: MatchService = TestBed.get(MatchService);

    expect(
      service.matchIsolatorsWithVolunteer(
        volunteerOneCountyOneLocation,
        isolators
      )
    ).toEqual([
      {
        details: {
          forename: "y",
          county: "a",
          selectedLocation: "1"
        }
      },
      {
        details: {
          forename: "x",
          county: "b",
          selectedLocation: "1"
        }
      }
    ]);

    expect(
      service.matchIsolatorsWithVolunteer(
        volunteerMultipleCountiesMultipleLocations,
        isolators
      )
    ).toEqual([
      {
        details: {
          forename: "y",
          county: "a",
          selectedLocation: "1"
        }
      },
      {
        details: {
          forename: "x",
          county: "b",
          selectedLocation: "1"
        }
      },
      {
        details: {
          forename: "w",
          county: "b",
          selectedLocation: "2"
        }
      }
    ]);
  });
});
