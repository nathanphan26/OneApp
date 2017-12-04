import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  // Validate services is used to validate user input
  constructor() { }

  // Makes sure the user input has not empty 
  validateRegister(user) {
    if(user.fname == undefined || user.lname == undefined || user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }

  // Uses RegEx to makes sure a string is in email format
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
