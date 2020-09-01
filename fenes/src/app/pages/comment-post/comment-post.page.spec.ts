import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommentPostPage } from './comment-post.page';

describe('CommentPostPage', () => {
  let component: CommentPostPage;
  let fixture: ComponentFixture<CommentPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
