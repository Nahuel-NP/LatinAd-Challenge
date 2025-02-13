export interface DisplayResponse {
  displays: Display[];
  meta:     Meta;
}

export interface Display {
  id:                number;
  name:              string;
  description:       string;
  picture_url:       string;
  price_per_day:     string;
  resolution_height: string;
  resolution_width:  string;
  type:              string;
  user_id:           string;
}

export interface Meta {
  total_items:  number;
  current_page: number;
  total_pages:  number;
}



