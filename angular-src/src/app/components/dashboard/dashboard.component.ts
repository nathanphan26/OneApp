import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	screenname: String;


  constructor() { }

  ngOnInit() {
  }

  getTimeline(){
  	console.log(this.screenname);
  }

}
