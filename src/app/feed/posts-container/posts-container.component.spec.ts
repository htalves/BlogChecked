import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EMPTY, of } from 'rxjs';

import { PostsContainerComponent } from './posts-container.component';

describe('PostsContainerComponent', () => {
  let component: PostsContainerComponent;
  let fixture: ComponentFixture<PostsContainerComponent>;
  const httpClientSpy = jasmine.createSpyObj<HttpClient>('httpClient', ['get', 'post']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsContainerComponent ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsContainerComponent);
    component = fixture.componentInstance;

    httpClientSpy.get.and.returnValue(EMPTY);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading screen while posts are loading', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const loading = fixture.debugElement.query(By.css('[data-unit-test="loading-screen"]'));
    const feed = fixture.debugElement.query(By.css('.feed__list'));

    expect(loading).toBeTruthy();
    expect(feed).toBeFalsy();
  });
  
  it('should display posts when loaded', () => {
    httpClientSpy.get.and.returnValue(of([]));
    component.ngOnInit();
    fixture.detectChanges();
    
    const loading = fixture.debugElement.query(By.css('[data-unit-test="loading-screen"]'));
    const feed = fixture.debugElement.query(By.css('.feed__list'));

    expect(loading).toBeFalsy();
    expect(feed).toBeTruthy();
  });
});
