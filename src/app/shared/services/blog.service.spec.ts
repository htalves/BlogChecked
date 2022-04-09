import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BlogService } from './blog.service';

describe('BlogService', () => {
  let service: BlogService;
  const httpClientSpy = jasmine.createSpyObj<HttpClient>('httpClient', ['get', 'post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    });
    service = TestBed.inject(BlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should populate replies correctly', done => {
    const commentResponse = [
      {
        id: 1,
        parent_id: null,
        date: "2022-01-01",
      },
      {
        id: 2,
        parent_id: null,
        date: "2022-01-02",
      },
      {
        id: 3,
        parent_id: 1,
        date: "2022-01-03",
      },
      {
        id: 4,
        parent_id: 2,
        date: "2022-01-04",
      },
      {
        id: 5,
        parent_id: 3,
        date: "2022-01-05",
      },
      {
        id: 6,
        parent_id: 5,
        date: "2022-01-06",
      },
      {
        id: 7,
        parent_id: 4,
        date: "2022-01-07",
      },
    ];
    httpClientSpy.get.and.returnValue(of(commentResponse));
    
   service.getComments(0)
    .subscribe(result => {
      const mappedIds = result.map(comment => comment.id);
      expect(mappedIds).toEqual([1,3,5,6,2,4,7]);
      done();
    });
  });
});
