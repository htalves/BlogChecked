import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, take, tap } from 'rxjs';
import { Post } from '../models/post';
import { Comment } from '../../shared/models/comment';
import { ApplicationConstants } from '../application-constants';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // private fakePost: Post = {
  //   id: 0,
  //   title: 'My fancy title',
  //   author: 'Jen Fucher',
  //   publish_date: new Date('2016-05-01'),
  //   slug: 'blog-post-0',
  //   description: 'small description',
  //   content: '<p>Eum no quem novum periculis, mea sonet zril ea. Electram urbanitas no mei, in eam graeci suavitate.</p> <p>An eam aliquid invidunt, mei veritus repudiandae ad, cum eu decore option complectitur. Sea tation iracundia eu. Sit ea adhuc idque maiorum. Vis ea simul habemus scriptorem, tale case assum no mei.</p>',
  // }

  private basePath = 'http://localhost:9001';

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getPosts(): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(`${this.basePath}/posts`)
      .pipe(
        map(posts => posts.sort((first, second) => new Date(second.publish_date).getTime() - new Date(first.publish_date).getTime())),
      );
  }
  
  public getFirstPostBySlug(slug: string): Observable<Post> {
    return this.httpClient.get<Array<Post>>(`${this.basePath}/posts?slug=${slug}`)
      .pipe(
        take(1),
        map(posts => posts[0]),
      );
  }

  public getComments(postId: number): Observable<Array<Comment>> {
    return this.httpClient.get<Array<Comment>>(`${this.basePath}/posts/${postId}/comments`)
      .pipe(
        map(comments => comments
          // sort by date ASC on parent comments
          .sort((first, second) => new Date(first.date).getTime() - new Date(second.date).getTime())
        ),
        map(comments => this.populateReplies(comments, null, 0, [])),
      );
  }

  public addComment(comment: Comment): Observable<number> {
    return this.httpClient.post(`${this.basePath}/posts/${comment.postId}/comments`, comment)
      .pipe(
        map(response => (response as Comment).id!)
      )
  }

  private populateReplies(allComments: Array<Comment>, parentId: number | null, depth: number, accumulatedReplies: Array<Comment>): Array<Comment> {
    allComments
      .filter(comment => comment.parent_id === parentId)
      .forEach(comment => {
        comment.depth = Math.min(ApplicationConstants.Posts.MaxReplyDepth, depth);
        accumulatedReplies.push(comment);
        this.populateReplies(allComments, comment.id!, depth + 1, accumulatedReplies);
      });

    return accumulatedReplies;
  }
}
