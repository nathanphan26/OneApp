import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {
	status: String;
	fbUser: Object;
	fbFeed: Object;
  fbLoggedIn: boolean;
  fbFeedBool: boolean;

  constructor(private fb: FacebookService) {
    // Facebook SDK Middleware
  	let initParams: InitParams = {
      appId: '524567017882986',
      xfbml: true,
      version: 'v2.10'
    };
 
    fb.init(initParams);
  }

  // Initialize logged in variables to be false
  ngOnInit() {
  	this.fbLoggedIn = false;
  	this.fbFeedBool = false;
  }

  // Calls facebook API to return information of logged in user
  fbGetUser() {
    this.fb.api('/me?fields=id,name,email,birthday')
      .then(res => {
        this.fbUser = res;
        console.log(this.fbUser);
        this.fbLoggedIn = true;
      })
      .catch(e => console.log(e));
  }

  // Calls facebook API to return logged in user's timeline feed
  fbGetFeed() {
  	this.fb.api('/me/feed')
  		.then(res => {
  			this.fbFeed = res;
  			this.fbFeedBool = true;
  			console.log(this.fbFeed);
  		})
  		.catch(e => console.log(e));
  }

  // Calls facebook API POST method to take in user's input and post a status
  fbPostStatus() {
  	this.fb.api('/me/feed?message=' + this.status, 'post')
			.then(res => console.log(res))
			.catch(e => console.log(e));
  }

  // Facebook API to login with facebook
  fbLogin() {
    // Self chosen facebook permissions
    const options: LoginOptions = {
      scope: 'public_profile,user_friends,email,user_birthday,user_posts,publish_actions',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.fb.login(options)
		  .then((response: LoginResponse) => {
		    console.log('Logged in', response);
		    this.fbGetUser();
		  })
		  .catch(e => console.error('Error logging in'));
  }

  // Facebook API to logout of facebook
  fbLogout() {
    this.fb.logout().then(() => {
      console.log('Logged out!');
      this.fbLoggedIn = false;
    });
  }

  // Quick methods to return logged in status
  fbIsUserLoggedIn() {
    return this.fbLoggedIn;
  }

  // Quick method to return if user wants their feed to be displayed
  fbReturnFeedBool() {
    return this.fbFeedBool;
  }

}
