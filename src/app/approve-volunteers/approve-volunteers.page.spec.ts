import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ApproveVolunteersPage } from "./approve-volunteers.page";

describe("ApproveVolunteersPage", () => {
  let component: ApproveVolunteersPage;
  let fixture: ComponentFixture<ApproveVolunteersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveVolunteersPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveVolunteersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
