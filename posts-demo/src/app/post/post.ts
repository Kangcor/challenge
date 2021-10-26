export interface Post {
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;

  id?: number;
  imageStatus?: string;
  showInMap?: boolean;
  created_at?: string;
  updated_at?: string;
}
