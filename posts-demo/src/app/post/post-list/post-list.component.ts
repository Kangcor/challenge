import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {Settings} from '../../settings';
import {Post} from '../post';

@Component({
  selector: 'wefox-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  public postList: Post[] = [];
  public selectedPost: Post | undefined;
  public showCreate = false;
  public showDetail = false;
  public showEdit = false;
  public showDelete = false;

  public IMAGE_STATUS_OK = Settings.IMAGE_STATUS_OK;
  public IMAGE_STATUS_ERROR = Settings.IMAGE_STATUS_ERROR;
  public POST_IMAGE_404_URL = Settings.POST_IMAGE_404_URL;

  public ACTION_CREATE = Settings.ACTION_CREATE;
  public ACTION_EDIT = Settings.ACTION_EDIT;

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.postService.postsHasChanged$.subscribe((hasChanged: boolean) => {
      if (hasChanged) {
        this.getPosts();
      }
    });
  }

  getPosts() {
    this.postService.list$().subscribe((posts: Post[]) => {
      this.postList = posts.map((post: Post) => {
        return {...post, imageStatus: this.IMAGE_STATUS_OK};
      });
    });
  }

  onImageError(id: number | undefined) {
    this.postList = this.postList.map((post: Post) => {
      if (post.id === id) {
        return {...post, imageStatus: this.IMAGE_STATUS_ERROR};
      } else {
        return post;
      }
    });
  }

  showCreatePost(show: boolean) {
    this.showCreate = show;
  }

  showDetailPost(show: boolean) {
    this.showDetail = show;
    if (!show) {
      this.selectedPost = undefined;
    }
  }

  showEditPost(show: boolean) {
    this.showEdit = show;
    if (!show) {
      this.selectedPost = undefined;
    }
  }

  showDeletePost(show: boolean) {
    this.showDelete = show;
    if (!show) {
      this.selectedPost = undefined;
    }
  }

  detailPost(post: Post) {
    this.selectedPost = post;
    this.showDetailPost(true);
  }

  editPost(post: Post) {
    this.selectedPost = post;
    this.showEditPost(true);
  }

  deletePost(post: Post) {
    this.selectedPost = post;
    this.showDeletePost(true);
  }

}
