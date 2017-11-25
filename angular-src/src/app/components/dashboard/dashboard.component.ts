import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	screenname: String;
  tweets: any[];
  stringedTweets: String;


  constructor(private authService:AuthService,private flashMessage:FlashMessagesService,private fb: FacebookService) { 
    let initParams: InitParams = {
      appId: '524567017882986',
      xfbml: true,
      version: 'v2.10'
    };
 
    fb.init(initParams);

  //   this.fb.login()
  // .then((response: LoginResponse) => console.log('Logged in', response))
  // .catch(e => console.error('Error logging in'));
  }

  // Debugging for tweets
  ngOnInit() {
    this.tweets = [
      {
        tweet: "tweet0"
      },
      {
        tweet: "tweet1"
      }
    ]
    console.log(this.tweets);
  }

  fbLogin(){
    this.fb.login()
  .then((response: LoginResponse) => console.log('Logged in', response))
  .catch(e => console.error('Error logging in'));
  }

  fbLogout(){
    this.fb.logout().then(() => console.log('Logged out!'));
  }

  fbGetUser(){
    this.fb.api('/me?fields=id,name')
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }

  // On form submit
  getTimeline(){
  	// console.log(this.screenname);
    const obj = {
      screenname: this.screenname
    }

    // References ../../services/auth.services to grab tweets from backend
    this.authService.getTweets(obj).subscribe(data => {
      console.log("data" + data);
      if (data.success){
        this.flashMessage.show('Worked', {cssClass: 'alert-success', timeout: 8000});
        this.tweets = data.msg;
        console.log(this.tweets);
        this.stringedTweets = JSON.stringify(this.tweets);
        console.log(this.stringedTweets);
      } else {
        this.flashMessage.show('Something went wrong..', {cssClass: 'alert-danger', timeout: 8000});
      }
    });

  }

  

}
