import { Http, Headers } from '@angular/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Sensitive } from './app.private';

export interface Report {
  account: {};
  approved: boolean;
  comment: string;
  coordinate: string;
  country: string;
  distanceFromShore: string;
  formattedReportTime: string;
  id: number;
  latestComments: any;
  location: string;
  messages: any;
  official: true;
  platformType: number;
  platformVersion: string;
  reportTime: number;
  sharkLength: string;
  sharkPhotos: Array<any>;
  sharkVideoLinks: Array<any>;
  sharkVideos: Array<any>;
  state: string;
  totalComment: any;
  typeOfEncounter: string;
  typeOfShark: string;
  unreadMessages: any;
  userLocation: string;
  weatherCondition: any;
  zone: string;
}

export interface Response {
  error: any;
  responseData: Array<any>;
}

@Injectable()
export class Dorsal  { 

  // Resolve HTTP using the constructor
  constructor (private http: Http, private sensitive: Sensitive) {
    this.sensitive = sensitive;
  }

  createAuthorizationHeader(headers: Headers):Headers {
    headers.append('publicKey', this.sensitive.getToken()); 
    return headers;
  }
  
  getZones(country: string, state: string):Observable<Response> {
    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);
    return this.http.get('http://api.dorsalwatch.com/public/surfspot/zone/' + country + '/' + state + '/' + this.sensitive.getToken()).map(
      response => response.json()
    ); 
  }

  getLocations(country: string, state: string, zone: string):Observable<Response> {
    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);
    return this.http.get('http://api.dorsalwatch.com/public/surfspot/location/' + country + '/' + state + '/' + zone + '/' + this.sensitive.getToken()).map(
      response => response.json()
    ); 
  }


  getStates():Observable<Response> {
    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);
    return this.http.get('http://api.dorsalwatch.com/public/states').map(
      response => response.json()
    ); 
  }

  getSharks(selectedState: string):Observable<Response> {
    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);
    let body = {
      "approved": true,
      "state": selectedState,
      "country": "Australia",
      "timeRange":0,
      "pageIndex": 0,
      "pageSize": 10,
      "publicKey": this.sensitive.getToken()
    }
    return this.http.post('http://api.dorsalwatch.com/public/report/list', body).map(
      response => response.json()
    ); 
  }

}