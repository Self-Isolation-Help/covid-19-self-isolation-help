import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { IsolatorPage } from "./isolator.page";

describe("IsolatorPage", () => {
  let component: IsolatorPage;
  let fixture: ComponentFixture<IsolatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IsolatorPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(IsolatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
