import { Component, Input } from '@angular/core';
import {Post} from '../post';

@Component({
  selector: 'wefox-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {

  @Input() post: Post | undefined;

  public IMAGE_STATUS_OK = 'OK';
  public IMAGE_STATUS_ERROR = 'ERROR';

  public POST_IMAGE_404_URL = 'https://via.placeholder.com/128x90?text=Image+not+found';


}
