import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Post } from '../../models/post';

import { PostSummaryComponent } from './post-summary.component';

describe('PostSummaryComponent', () => {
  let component: PostSummaryComponent;
  let fixture: ComponentFixture<PostSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSummaryComponent ]
    })
    .overrideComponent(PostSummaryComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display link on title', () => {
    component.hasTitleLink = true;
    component.post = { } as Post;
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeTruthy();
  });

  it('should not display link on title', () => {
    component.hasTitleLink = false;
    component.post = { } as Post;
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeFalsy();
  });
});
