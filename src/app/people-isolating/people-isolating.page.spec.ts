import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PeopleIsolatingPage } from "./people-isolating.page";

describe("PeopleIsolatingPage", () => {
  let component: PeopleIsolatingPage;
  let fixture: ComponentFixture<PeopleIsolatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleIsolatingPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleIsolatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
