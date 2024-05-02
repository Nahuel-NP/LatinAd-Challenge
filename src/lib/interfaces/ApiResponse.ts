export interface Display {
  id:                number;
  name:              string;
  description:       string;
  picture_url:       string;
  user_id:           number;
  price_per_day:     string;
  resolution_height: string;
  resolution_width:  string;
  type:              string;
}


export interface DisplayResponse {
  totalCount: number;
  data:       Display[];
}


