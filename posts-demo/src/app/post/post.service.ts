import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Post} from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = 'http://localhost:3000/api/v1/posts';

  public postsHasChanged$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) {
  }

  list$(): Observable<Post[]> {
    return this.http.get(`${this.API_URL}`) as Observable<Post[]>;
  }

  show$(id: number): Observable<Post> {
    return this.http.get(`${this.API_URL}/${id}`) as Observable<Post>;
  }

  create$(post: Post) {
    return this.http.post(`${this.API_URL}`, post).pipe(
      tap(() => this.postsHasChanged$.next(true))
    );
  }

  update$(post: Post, id: number | undefined) {
    return this.http.put(`${this.API_URL}/${id}`, post).pipe(
      tap(() => this.postsHasChanged$.next(true))
    );
  }

  delete$(id: number | undefined) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      tap(() => this.postsHasChanged$.next(true))
    );
  }
}
