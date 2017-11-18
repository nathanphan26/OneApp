import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	screenname: String;
  tweets: any[];
  stringedTweets: String;


  constructor(private authService:AuthService,private flashMessage:FlashMessagesService) { 

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

  // On form submit
  getTimeline(){
  	// console.log(this.screenname);
    const obj = {
      screenname: this.screenname
    }

    // References ../../services/auth.services to grab tweets from backend
    this.authService.getTweets(obj).subscribe(data => {
      // console.log(data);
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
