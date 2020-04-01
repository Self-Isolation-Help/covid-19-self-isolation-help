import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PeopleIsolatingGroupedPage } from "./people-isolating-grouped.page";

describe("PeopleIsolatingGroupedPage", () => {
  let component: PeopleIsolatingGroupedPage;
  let fixture: ComponentFixture<PeopleIsolatingGroupedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleIsolatingGroupedPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleIsolatingGroupedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
