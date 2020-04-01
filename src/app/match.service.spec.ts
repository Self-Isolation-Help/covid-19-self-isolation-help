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
      selectedLocation: { name: "1" }
    }
  },
  {
    details: {
      forename: "x",
      county: "b",
      selectedLocation: { name: "1" }
    }
  },
  {
    details: {
      forename: "w",
      county: "b",
      selectedLocation: { name: "2" }
    }
  }
];

const isolatorCountyOnly: Isolator = {
  details: {
    forename: "z",
    county: "a"
  }
};

const isolatorSelectedLocation: Isolator = {
  details: {
    forename: "x",
    county: "b",
    selectedLocation: {
      name: "z"
    }
  }
};

const volunteers: Array<Volunteer> = [
  {
    details: {
      forename: "Test"
    },
    workingCounties: ["a"]
  },
  {
    details: {
      forename: "Test"
    },
    workingCounties: ["b"]
  },
  {
    details: {
      forename: "Test"
    },
    workingCounties: ["a", "b"]
  },
  {
    details: {
      forename: "Test"
    },
    workingCounties: ["a"],
    workingLocations: ["z"]
  },
  {
    details: {
      forename: "Test"
    },
    workingCounties: ["a"],
    workingLocations: ["z", "x"]
  },
  {
    details: {
      forename: "Test"
    },
    workingCounties: ["a", "b"],
    workingLocations: ["z", "x"]
  },

  {
    details: {
      forename: "Test"
    },
    workingCounties: ["a"],
    workingLocations: ["z", "x"]
  }
];

fdescribe("MatchService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MatchService = TestBed.get(MatchService);
    expect(service).toBeTruthy();
  });
  it("should match isolators by county IF the volunteer has NO workingLocations", () => {
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
          selectedLocation: { name: "1" }
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
          selectedLocation: { name: "1" }
        }
      },
      {
        details: {
          forename: "x",
          county: "b",
          selectedLocation: { name: "1" }
        }
      },
      {
        details: {
          forename: "w",
          county: "b",
          selectedLocation: { name: "2" }
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
          selectedLocation: { name: "1" }
        }
      },
      {
        details: {
          forename: "x",
          county: "b",
          selectedLocation: { name: "1" }
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
          selectedLocation: { name: "1" }
        }
      },
      {
        details: {
          forename: "x",
          county: "b",
          selectedLocation: { name: "1" }
        }
      },
      {
        details: {
          forename: "w",
          county: "b",
          selectedLocation: { name: "2" }
        }
      }
    ]);
  });
  it("should match volunteers by workingCounties IF the isolator has NO selectedLocation", () => {
    const service: MatchService = TestBed.get(MatchService);
    expect(
      service.matchVolunteersWithIsolator(isolatorCountyOnly, volunteers)
    ).toEqual([
      {
        details: {
          forename: "Test"
        },
        workingCounties: ["a"]
      },
      {
        details: {
          forename: "Test"
        },
        workingCounties: ["a", "b"]
      },
      {
        details: {
          forename: "Test"
        },
        workingCounties: ["a"],
        workingLocations: ["z"]
      },
      {
        details: {
          forename: "Test"
        },
        workingCounties: ["a"],
        workingLocations: ["z", "x"]
      },
      {
        details: {
          forename: "Test"
        },
        workingCounties: ["a", "b"],
        workingLocations: ["z", "x"]
      },

      {
        details: {
          forename: "Test"
        },
        workingCounties: ["a"],
        workingLocations: ["z", "x"]
      }
    ]);
  });
  it("should match volunteers by workingLocations IF the isolator has selectedLocation", () => {
    const service: MatchService = TestBed.get(MatchService);
    expect(
      service.matchVolunteersWithIsolator(isolatorSelectedLocation, volunteers)
    ).toEqual([
      {
        details: {
          forename: "Test"
        },
        workingCounties: ["a"],
        workingLocations: ["z"]
      },
      {
        details: {
          forename: "Test"
        },
        workingCounties: ["a"],
        workingLocations: ["z", "x"]
      },
      {
        details: {
          forename: "Test"
        },
        workingCounties: ["a", "b"],
        workingLocations: ["z", "x"]
      },

      {
        details: {
          forename: "Test"
        },
        workingCounties: ["a"],
        workingLocations: ["z", "x"]
      }
    ]);
  });
});
