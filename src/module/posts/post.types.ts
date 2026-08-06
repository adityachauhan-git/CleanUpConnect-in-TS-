export interface post {
  title: string;
  content: string;
  location: string;
  creator_id: number;
}

export interface position {
  latitude: number;
  longitude: number;
}

export interface NominatimResponse {
  address: {
    state: string;
    city?: string;
    country?: string;
    postcode?: string;
  };
}

export interface eventParams {
  eventid: string;
}

export interface eventData {
  event_id: number;
  user_id: number;
  
}





export interface postParams {
  id: string;
}

export interface comment {
  comment: string;
}
