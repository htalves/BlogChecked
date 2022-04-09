import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { BlogService } from 'src/app/shared/services/blog.service';

import { PostViewContainerComponent } from './post-view-container.component';

describe('PostViewContainerComponent', () => {
  let component: PostViewContainerComponent;
  let fixture: ComponentFixture<PostViewContainerComponent>;
  const httpClientSpy = jasmine.createSpyObj<HttpClient>('httpClient', ['get', 'post']);
  const activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', ['params']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostViewContainerComponent,
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        BlogService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewContainerComponent);
    component = fixture.componentInstance;
    
    activatedRouteSpy.params = EMPTY;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading screen while loading', () => {
    const loading = fixture.debugElement.query(By.css('[data-unit-test="loading-screen"]'));
    expect(loading).toBeTruthy();
  });
});
