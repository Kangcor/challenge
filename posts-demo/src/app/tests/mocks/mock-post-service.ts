import {of, Subject} from 'rxjs';
import {Post} from '../../post/post';

export class MockPostService {

  public postsHasChanged$ = new Subject<boolean>();

  list$() {
    return of([]);
  }

  show$(id: number) {
    return of(true);
  }

  create$(post: Post) {
    return of(true);
  }

  update$(post: Post, id: number) {
    return of(true);
  }

  delete$(id: number) {
    return of(true);
  }

}
