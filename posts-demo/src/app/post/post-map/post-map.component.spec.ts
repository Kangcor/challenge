import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMapComponent } from './post-map.component';
import {PostService} from '../post.service';
import {MockPostService} from '../../tests/mocks/mock-post-service';
import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({selector: 'google-map', template: ''})
class GoogleMapMockComponent {
  @Input() zoom: number | undefined;
  @Input() center: google.maps.LatLngLiteral | undefined;
}

@Component({selector: 'map-marker', template: ''})
class MapMarkerMockComponent {
  @Input() position: google.maps.LatLngLiteral | undefined;
  @Input() options: google.maps.MapOptions | undefined;
  @Output() mapClick = new EventEmitter<any>();
}

@Component({selector: 'map-info-window', template: ''})
class MapInfoWindowMockComponent {
}

describe('PostMapComponent', () => {
  let component: PostMapComponent;
  let fixture: ComponentFixture<PostMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostMapComponent,
        GoogleMapMockComponent,
        MapMarkerMockComponent,
        MapInfoWindowMockComponent
      ],
      providers: [
        { provide: PostService, useClass: MockPostService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
