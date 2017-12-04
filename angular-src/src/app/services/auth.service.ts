import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  /*
   * Auth Services purpose to group all necessary functions that have to do with authentication.
   * It acts as a middleman between front end data and back end data
   */
  constructor(private http:Http) { }

  // Takes in a user and adds them to the database through backend POST method
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/users/register', user,{headers: headers})
      .map(res => res.json());
  }

  // Takes in a user and checks database to see if user exists through backend POST method
  authenticateUser(user) {
  	let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  // Calls backend API to grab tweets of specified user
  getTweets(obj) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/apis/timeline', obj,{headers: headers})
      .map(res => res.json());
  }

  // Calls backend API to grab home timeline of logged in Twitter user
  getHomeT(obj) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/apis/home_timeline', obj,{headers: headers})
      .map(res => res.json());
  }

  // Takes in an authToken and grabs the users data from backend GET method
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:8000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  // Sets the local storage to hold the logged in user info as well as their special auth token
  storeUserData(token, user) {
  	localStorage.setItem('id_token', token);
  	localStorage.setItem('user', JSON.stringify(user));
  	this.authToken = token;
  	this.user = user;
  }

  // Grbas the auth token from local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token; 
  }

  // Check to see if user is logged in
  loggedIn() {
    return tokenNotExpired('id_token');
  }

  // Clears locals storage when user logs out
  logout() {
  	this.authToken = null;
  	this.user = null;
  	localStorage.clear();
  }
}
