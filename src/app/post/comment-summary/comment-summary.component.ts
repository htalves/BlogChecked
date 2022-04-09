import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../shared/models/comment';

@Component({
  selector: 'app-comment-summary',
  templateUrl: './comment-summary.component.html',
  styleUrls: ['./comment-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentSummaryComponent {
  @Input()
  public comment: Comment;

  @Output()
  public onReplyAdded = new EventEmitter<Partial<Comment>>();

  public showReplyForm = false;

  public replyToComment(): void {
    this.showReplyForm = true;
  }

  public onCommentAddedHandler(comment: Partial<Comment>): void {
    const newComment: Partial<Comment> = {
      user: comment.user!,
      date: comment.date!,
      content: comment.content!,
      depth: (this.comment.depth || 0) + 1,
      parent_id: this.comment.id,
    }

    this.onReplyAdded.emit(newComment);
    this.showReplyForm = false;
  }
}
