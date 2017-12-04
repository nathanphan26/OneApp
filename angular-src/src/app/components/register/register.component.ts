import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fname: String;
  lname: String;
  email: String;
  username: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
   ) {}

  ngOnInit() {}

  onRegisterSubmit(){
    const user = {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all the fields.', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter a valid email.', {cssClass: 'alert-danger', timeout: 4000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You have registered successfully!', {cssClass: 'alert-success', timeout: 8000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong..', {cssClass: 'alert-danger', timeout: 8000});
        this.router.navigate(['/register']);
      }
    });
  }
}
