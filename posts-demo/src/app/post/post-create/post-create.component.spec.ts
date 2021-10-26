import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateComponent } from './post-create.component';
import {PostService} from '../post.service';
import {MockPostService} from '../../tests/mocks/mock-post-service';
import {FormBuilder} from '@angular/forms';
import {Settings} from '../../settings';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let postService: PostService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ PostCreateComponent ],
      providers: [
        { provide: PostService, useClass: MockPostService },
        FormBuilder,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    component.action = Settings.ACTION_CREATE;
    postService = TestBed.inject(PostService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check form is invalid without title and content', () => {
    expect(component.myForm.invalid).toBeTrue();
  });

  it('should check form is valid with title and content', () => {
    component.myForm.patchValue({title: 'Test Title', content: 'Test Content'});
    expect(component.myForm.valid).toBeTrue();
  });

  it('should check latitude is between -90 and 90', () => {
    component.myForm.get('lat')?.setValue(45);
    expect(component.myForm.get('lat')?.valid).toBeTrue();
    component.myForm.get('lat')?.setValue(95);
    expect(component.myForm.get('lat')?.valid).toBeFalse();
    component.myForm.get('lat')?.setValue(-95);
    expect(component.myForm.get('lat')?.valid).toBeFalse();
    component.myForm.get('lat')?.setValue(-40);
    expect(component.myForm.get('lat')?.valid).toBeTrue();
  });

  it('should prevent submit form when is invalid and mark form as touched', () => {
    expect(component.myForm.touched).toBeFalse();
    expect(component.myForm.valid).toBeFalse();
    component.createPost();
    expect(component.myForm.touched).toBeTrue();
    expect(component.myForm.valid).toBeFalse();
  });

  it('should submit form when is valid and call the service method CREATE', () => {
    spyOn(postService, 'create$').and.callThrough();
    expect(component.myForm.valid).toBeFalse();
    component.myForm.patchValue({title: 'Test Title', content: 'Test Content'});
    expect(component.myForm.valid).toBeTrue();
    component.createPost();
    expect(postService.create$).toHaveBeenCalled();
  });
});
