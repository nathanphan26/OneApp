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
  homeTweets: any[];

  constructor(private authService:AuthService,private flashMessage:FlashMessagesService) {}

  ngOnInit() {}

  // Function that grabs user input and call backend Twitter API to display a specific user's timeline
  getTimeline() {
    const obj = {
      screenname: this.screenname
    }

    // References ../../services/auth.services to grab tweets from backend
    this.authService.getTweets(obj).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Worked', {cssClass: 'alert-success', timeout: 8000});
        this.tweets = data.msg;
      } else {
        this.flashMessage.show('Something went wrong..', {cssClass: 'alert-danger', timeout: 8000});
      }
    });
  }

  getHome() {
    const obj = {
      screenname: this.screenname
    }

    // References ../../services/auth.services to grab tweets from backend
    this.authService.getHomeT(obj).subscribe(data => {
      if (data.success){
        this.flashMessage.show('Worked', {cssClass: 'alert-success', timeout: 8000});
        this.homeTweets = data.msg;
      } else {
        this.flashMessage.show('Something went wrong..', {cssClass: 'alert-danger', timeout: 8000});
      }
    });
  }
}
