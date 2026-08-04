export interface post{
    title:string
    content: string
    location:string
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

export interface eventParams {

  id:string

}

export interface joinData{

  event_id:number
  user_id:number

}

export interface postParams{
  id:string
}

