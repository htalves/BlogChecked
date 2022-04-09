import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss']
})
export class PostsContainerComponent implements OnInit {
  public posts$: Observable<Array<Post>> = EMPTY;
  public isLoading = true;

  constructor(
    private readonly blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.blogService.getPosts();

    this.posts$.subscribe(_ => this.isLoading = false);
  }

  public postTrackBy(index: number, post: Post): number {
    return post.id; 
  }
}
