import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { Comment } from '../../shared/models/comment';

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.scss']
})
export class CommentsContainerComponent implements OnInit {
  @Input('post-id')
  public postId: number;
  public isLoading = true;

  public comments: Array<Comment> = [];

  constructor(
    private readonly blogService: BlogService,
  ) { }

  ngOnInit(): void {
    this.fetchComments();
  }
  
  public commentsTrackBy(index: number, entry: Comment): number {
    return entry.id!;
  }

  public onCommentAddedHandler(comment: Partial<Comment>): void {
    const newComment: Comment = {
      user: comment.user!,
      date: comment.date!,
      content: comment.content!,
      postId: this.postId,
      depth: comment.depth || 0,
      parent_id: comment.parent_id || null,
    }

    this.blogService.addComment(newComment)
      .subscribe(_ => this.fetchComments());
  }

  private fetchComments(): void {
    this.isLoading = true;
    this.blogService.getComments(this.postId)
      .subscribe(comments => {
        this.comments = comments;
        this.isLoading = false;
      },
      _ => this.isLoading = false);
  }
}
