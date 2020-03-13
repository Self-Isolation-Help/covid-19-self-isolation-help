import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareLocationPage } from './share-location.page';

describe('ShareLocationPage', () => {
  let component: ShareLocationPage;
  let fixture: ComponentFixture<ShareLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
