import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Comment } from 'src/app/shared/models/comment';
import { AddCommentComponent } from './add-comment.component';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommentComponent ],
      providers: [
        FormBuilder,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit partial comment when submiting form', () => {
    const eventSpy = spyOn(component.onCommentAdded, 'emit');

    component.addCommentForm.get('username')?.setValue('LetsGetChecked');
    component.onFormSubmit();

    expect(eventSpy).toHaveBeenCalled();
    expect(eventSpy).toHaveBeenCalledWith(jasmine.objectContaining<Partial<Comment>>({ user: 'LetsGetChecked' }));
  });
});
