import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CommentSummaryComponent } from './comment-summary.component';

@Component({ selector: 'app-add-comment', template: '' })
class AddCommentComponentFake {}

describe('CommentSummaryComponent', () => {
  let component: CommentSummaryComponent;
  let fixture: ComponentFixture<CommentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CommentSummaryComponent,
        AddCommentComponentFake,
      ],
      providers: [ FormBuilder ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentSummaryComponent);
    component = fixture.componentInstance;

    component.comment = {
      user: '',
      content: '',
      date: '',
      depth: 0,
      postId: 0,
      parent_id: null,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit partial comment when a reply is added', () => {
    const eventSpy = spyOn(component.onReplyAdded, 'emit');

    component.onCommentAddedHandler({ user: 'Test' });
    expect(eventSpy).toHaveBeenCalled();
  });

  it('should display reply form when button is clicked', () => {
    const replyButton = fixture.debugElement.query(By.css('[data-unit-test="reply-button"]'));
    
    expect(replyButton).toBeTruthy();
    expect(component.showReplyForm).toBe(false);

    replyButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.showReplyForm).toBe(true);
  });
});
