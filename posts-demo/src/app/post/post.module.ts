import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCardComponent } from './post-card/post-card.component';
import {PostRoutingModule} from './post-routing.module';
import { PostMapComponent } from './post-map/post-map.component';
import {GoogleMapsModule} from '@angular/google-maps';



@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent,
    PostDeleteComponent,
    PostDetailComponent,
    PostCardComponent,
    PostMapComponent
  ],
  exports: [
    PostListComponent,
    PostCreateComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule
  ]
})
export class PostModule { }
