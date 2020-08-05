import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntercepterComponent } from './intercepter.component';

describe('IntercepterComponent', () => {
  let component: IntercepterComponent;
  let fixture: ComponentFixture<IntercepterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntercepterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntercepterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
