import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PostViewContainerComponent } from './post-view-container/post-view-container.component';
import { CommentsContainerComponent } from './comments-container/comments-container.component';
import { CommentSummaryComponent } from './comment-summary/comment-summary.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostViewContainerComponent,
    CommentsContainerComponent,
    CommentSummaryComponent,
    AddCommentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class PostModule { }
