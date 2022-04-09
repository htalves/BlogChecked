import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-post-summary',
  templateUrl: './post-summary.component.html',
  styleUrls: ['./post-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostSummaryComponent {
  @Input()
  public post: Post;

  @Input('has-title-link')
  public hasTitleLink = false;
}
