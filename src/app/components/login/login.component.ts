import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // keep two fields, and make them public so that the template can show the value
  // in an actual production system you would create a "getter" method and the vars
  // would be changed via a setter method
  public username: string = '';   // watch out! this is an empty string, there is no space between the quotes!
  public password: string = '';

  // this is a boolean vafiable to "remember" the password should be visible or not
  public showPassword: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  // this method changes the value of show password from false to true and vice versa!
  togglePassword() {
    this.showPassword = ! this.showPassword;  // the ! mark means to negate logically the value of what
                                              // is on it's right. !false is true and !true is false
    // VERY IMPORTANT! When a method is used as a (click) handler on a hyperlink (that is <a> tag)
    //                 then in order to cancel the link clicking action (so that the browser will NOT
    //                 navigate to the page indicated by the href of the <a>) you have to return false
    //                 Even when there is no href attribute specifically set, it is often assumed by
    //                 the browser that it is a link to the page itself and it reloads the application!
    return false;
  }

  // this method returns the type of the input control in the template, that should be used
  // based on the value of the showPassword field
  passType() {
    if (this.showPassword) {
      return 'text';
    } else {
      return 'password';
    }
  }

  // this method does the same as the previous one, but returns what should the label of the button show
  toggleLabel() {
    if (this.showPassword) {
      return 'Hide password';
    } else {
      return 'Show password';
    }
  }

  // this method simulates a login attempt. it first checks to see if the fields
  // (username & password) have acceptable values. for example here we need to
  // make sure that the username & pass have 4 letter or more
  attemptLogin() {
    if (this.username.length <= 3) {
      alert('Username too short!');
      return;
    }
    if (this.password.length <= 3) {
      alert('Password too short!');
      return;
    }

    //////// this is an alternative approach of the two ifs above. this combines the
    //////// checks with the OR operator (||) and produces a less informative message
    // if (this.username.length <= 3 || this.password.length <= 3) {
    //   alert('Username or Password too short!');
    //   return;
    // }

    // actually at this point we would send the username & pass to the server and then
    // present the reult to the user - but we leave that for next lessons
    alert('WOW! You are logged in!');
  }
}
