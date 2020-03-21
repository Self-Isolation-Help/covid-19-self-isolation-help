import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtendOperationsPage } from './extend-operations.page';

describe('ExtendOperationsPage', () => {
  let component: ExtendOperationsPage;
  let fixture: ComponentFixture<ExtendOperationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendOperationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtendOperationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
