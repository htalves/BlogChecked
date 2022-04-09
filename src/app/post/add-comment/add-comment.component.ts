import { Component, EventEmitter, OnInit, Output, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationConstants } from 'src/app/shared/application-constants';
import { Comment } from 'src/app/shared/models/comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Output()
  public onCommentAdded: EventEmitter<Partial<Comment>> = new EventEmitter<Partial<Comment>>();

  public addCommentForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.addCommentForm = this.formBuilder.group(
      {
        username: [this.getFunRandomUsername(), [ Validators.required, Validators.minLength(ApplicationConstants.Validators.MinUsernameLength) ]],
        content: [this.ipsumLorem(), Validators.required],
      }
    );
  }

  public onFormSubmit(): void {
    const today = new Date();
    const newComment: Partial<Comment> = {
      date: `${today.getFullYear()}-${today.getMonth().toString().padStart(2, '0')}-${today.getDay().toString().padStart(2, '0')}`,
      content: this.sanitizer.sanitize(SecurityContext.HTML, this.addCommentForm.get('content')?.value),
      user: this.addCommentForm.get('username')?.value,
    };

    this.onCommentAdded.emit(newComment);
    this.addCommentForm.reset();
  }

  private getFunRandomUsername(): string {
    return ApplicationConstants.Username.FunRandom[Math.floor(Math.random() * ApplicationConstants.Username.FunRandom.length)];
  }
  
  private ipsumLorem(): string {
    return ApplicationConstants.IpsumLorem[Math.floor(Math.random() * ApplicationConstants.IpsumLorem.length)];
  }
}
