export interface post{
    title:string
    content: string
    location:string
}

export interface postParams{
    id:string
}

export interface position{
    latitude:number,
    longitude:number
}

export interface NominatimResponse {
  address: {
    state: string;
    city?: string;
    country?: string;
    postcode?: string;
  };
}