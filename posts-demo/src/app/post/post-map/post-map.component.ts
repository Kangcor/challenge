import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../post.service';
import {Settings} from '../../settings';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import {Post} from '../post';
import {Marker} from '../marker';

@Component({
  selector: 'wefox-post-map',
  templateUrl: './post-map.component.html',
  styleUrls: ['./post-map.component.scss']
})
export class PostMapComponent implements OnInit {

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  public postList: Post[] = [];
  public markerPositions: Marker[] = [];
  public selectedMarker: Marker | undefined;
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


  public center: google.maps.LatLngLiteral = {lat: 45, lng: 5};
  public zoom = 4;

  constructor(
    private postService: PostService,
  ) {
  }

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
        const imageStatus = this.IMAGE_STATUS_OK;
        const showInMap = !!post.lat && !!post.long;
        return {...post, imageStatus, showInMap};
      });

      this.markerPositions = this.postList
        .filter((post: Post) => post.showInMap)
        .map((post: Post) => {
          const coords: google.maps.LatLngLiteral = { lat: +post.lat, lng: +post.long };
          const options: google.maps.MarkerOptions = {draggable: false};
          return {...post, coords, options};
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

  showMarkerInMap(post: Post) {
    this.center = {lat: +post.lat, lng: +post.long};
  }

  openInfoWindow(marker: MapMarker, markerPosition: Marker) {
    this.selectedMarker = markerPosition;
    this.infoWindow?.open(marker);
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
