export interface Marker {
  title: string;
  content: string;
  lat: string;
  long: string;
  coords: google.maps.LatLngLiteral;
  options: google.maps.MarkerOptions;
}
