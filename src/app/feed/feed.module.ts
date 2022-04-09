import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsContainerComponent } from './posts-container/posts-container.component';
import { PostModule } from '../post/post.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostsContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostModule,
  ]
})
export class FeedModule { }
