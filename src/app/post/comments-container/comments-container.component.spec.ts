import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EMPTY, of } from 'rxjs';
import { Comment } from 'src/app/shared/models/comment';
import { CommentsContainerComponent } from './comments-container.component';

@Component({ selector: 'app-add-comment', template: '' })
class AddCommentComponentFake {}

@Component({ selector: 'app-comment-summary', template: '' })
class CommentSummaryComponentFake {
  @Input()
  public comment: Comment;
}

describe('CommentsContainerComponent', () => {
  let component: CommentsContainerComponent;
  let fixture: ComponentFixture<CommentsContainerComponent>;
  const httpClientSpy = jasmine.createSpyObj<HttpClient>('httpClient', ['get', 'post']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CommentsContainerComponent,
        AddCommentComponentFake,
        CommentSummaryComponentFake,
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        FormBuilder,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsContainerComponent);
    component = fixture.componentInstance;

    httpClientSpy.get.and.returnValue(EMPTY);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display appropriate message when there are no comments', done => {
    httpClientSpy.get.and.returnValue(of([]));
    
    component.ngOnInit();
    fixture.detectChanges();

    const noData = fixture.debugElement.query(By.css('.comments__no-data'));

    expect(noData).toBeTruthy();
    done();
  });
  
  it('should display comments when loaded', done => {
    component.isLoading = false;
    component.comments = [ { id: 0 } as Comment ];
    fixture.detectChanges();

    const noData = fixture.debugElement.query(By.css('.comments__no-data'));
    const listEntry = fixture.debugElement.queryAll(By.css('.comments__entry'));

    expect(noData).toBeFalsy();
    expect(listEntry).toBeTruthy();
    expect(listEntry.length).toBe(component.comments.length);
    done();
  });

  it('should fetch comments after a new comment is added', () => {
    component.postId = 92;
    httpClientSpy.get.calls.reset();
    httpClientSpy.post.and.returnValue(of({ id: 1 }));
    component.onCommentAddedHandler({ });

    expect(httpClientSpy.get).toHaveBeenCalledWith(jasmine.stringContaining(`posts/${component.postId}/comments`));
  });
});
