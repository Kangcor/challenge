import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from '../post';

@Component({
  selector: 'wefox-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {

  @Input() post: Post | undefined;
  @Output() showModal = new EventEmitter<boolean>();

  closeModal() {
    this.showModal.emit(false);
  }

}
