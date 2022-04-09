import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-post-view-container',
  templateUrl: './post-view-container.component.html',
  styleUrls: ['./post-view-container.component.scss'],
})
export class PostViewContainerComponent implements OnInit {
  public post: Post;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(parameters => {
          const slug = parameters['slug'];
          return this.blogService.getFirstPostBySlug(slug);
        })
      )
      .subscribe(post => this.post = post);
  }
}
