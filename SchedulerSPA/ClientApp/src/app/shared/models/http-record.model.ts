export interface IHttpRecord {
  httpRecordId: number;
  time: Date;
  method: HttpMethod;
  uri: string;
  token: string;
  body: string;
  completed: boolean;
}

export enum HttpMethod {
    GET     = "GET",
    HEAD    = "HEAD",
    POST    = "POST",
    PUT     = "PUT",
    DELETE  = "DELETE",
    CONNECT = "CONNECT",
    OPTION  = "OPTION",
    TRACE   = "TRACE",
    PATCH   = "PATCH",
}
