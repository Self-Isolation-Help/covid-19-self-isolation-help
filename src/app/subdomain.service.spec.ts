import { TestBed } from "@angular/core/testing";

import { SubdomainService } from "./subdomain.service";

describe("SubdomainService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SubdomainService = TestBed.get(SubdomainService);
    expect(service).toBeTruthy();
  });
});
