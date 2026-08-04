export interface RegisterBody {
    username : string
    password: string
}

export interface LoginBody {
    username : string
    password:string
}

export interface Tokens{
    ACCESS_TOKEN: string
    REFRESH_TOKEN:string
}



export interface JwtPayload {
  id: string;
  username: string;

}

