import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostService} from '../post.service';
import {Post} from '../post';

@Component({
  selector: 'wefox-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {

  @Input() post: Post | undefined;
  @Output() showModal = new EventEmitter<boolean>();

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.showModal.emit(false);
  }

  deletePost() {
    this.postService.delete$(this.post?.id).subscribe(() => {
      this.closeModal();
    });
  }
}
