import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {Settings} from '../../settings';
import {Post} from '../post';

@Component({
  selector: 'wefox-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  @Input() post: Post | undefined;
  @Input() action: string | undefined;
  @Output() showModal = new EventEmitter<boolean>();

  public myForm: FormGroup;
  public ACTION_CREATE = Settings.ACTION_CREATE;
  public ACTION_EDIT = Settings.ACTION_EDIT;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
  ) {
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      lat: ['', [Validators.min(-90), Validators.max(90)]],
      long: ['', [Validators.min(-180), Validators.max(180)]],
      image_url: [''],
    });
  }

  ngOnInit(): void {
    if (this.action === this.ACTION_EDIT && this.post) {
      this.myForm.patchValue(this.post);
    }
  }

  closeModal() {
    this.showModal.emit(false);
  }

  createPost() {
    if (this.myForm.valid) {
      const action$ = this.action === this.ACTION_CREATE ?
        this.postService.create$(this.myForm.value) :
        this.postService.update$(this.myForm.value, this.post?.id);
      action$.subscribe(() => this.closeModal());
    } else {
      this.myForm.markAllAsTouched();
    }
  }

}
