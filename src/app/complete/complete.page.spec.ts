import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompletePage } from './complete.page';

describe('CompletePage', () => {
  let component: CompletePage;
  let fixture: ComponentFixture<CompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
