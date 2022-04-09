import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from './services/blog.service';
import { HttpClientModule } from '@angular/common/http';
import { PostSummaryComponent } from './components/post-summary/post-summary.component';

@NgModule({
  declarations: [
    PostSummaryComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    PostSummaryComponent,
  ],
  providers: [
    BlogService,
  ]
})
export class SharedModule { }
