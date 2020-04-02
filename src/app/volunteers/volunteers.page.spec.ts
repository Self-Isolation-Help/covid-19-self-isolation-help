import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { VolunteersPage } from "./volunteers.page";

describe("VolunteersPage", () => {
  let component: VolunteersPage;
  let fixture: ComponentFixture<VolunteersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VolunteersPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VolunteersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
