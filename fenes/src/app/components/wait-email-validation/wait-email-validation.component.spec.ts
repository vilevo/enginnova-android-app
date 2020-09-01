import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaitEmailValidationComponent } from './wait-email-validation.component';

describe('WaitEmailValidationComponent', () => {
  let component: WaitEmailValidationComponent;
  let fixture: ComponentFixture<WaitEmailValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitEmailValidationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaitEmailValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
