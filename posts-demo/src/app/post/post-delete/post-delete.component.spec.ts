import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDeleteComponent } from './post-delete.component';
import {PostService} from '../post.service';
import {MockPostService} from '../../tests/mocks/mock-post-service';
import {Component, Input} from '@angular/core';
import {Post} from '../post';

@Component({selector: 'wefox-post-card', template: ''})
class PostCardMockComponent {
  @Input() post: Post | undefined;
}

describe('PostDeleteComponent', () => {
  let component: PostDeleteComponent;
  let fixture: ComponentFixture<PostDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostDeleteComponent,
        PostCardMockComponent
      ],
      providers: [
        { provide: PostService, useClass: MockPostService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
