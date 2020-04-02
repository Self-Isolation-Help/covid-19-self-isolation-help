import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { MoreInfoPage } from "./more-info.page";

describe("MoreInfoPage", () => {
  let component: MoreInfoPage;
  let fixture: ComponentFixture<MoreInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoreInfoPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
