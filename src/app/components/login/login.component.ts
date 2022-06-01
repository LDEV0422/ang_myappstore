import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  // to get all users
  users: any;

  // error message
  errorState: boolean = false;
  errorMessage!: string;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService
      .getUsers()
      .subscribe((response) => {
        this.users = response;
      })
  }


  submitLoginForm() {

    // *********** LOGIN FORM VALIDATION  *********** //
    // if form is invalid (empty inputs), early exit
    if (this.form.invalid) {
      this.errorState = true;
      this.errorMessage = "Please indicate email and password"
      return;
    }

    // check username and password
    for (let i = 0; i < this.users.length; i++) {
      // console.log(this.users[i]);

      // TODO: check only username or email (unique) instead of all users
      if (this.form.get('email')?.value === this.users[i].email && this.form.get('password')?.value === this.users[i].password) {

        // if user exists TODO: erase this
        // console.log("User exists: " + this.users[i].email + " with token " + this.users[i].token);

        // authService method = loggedIn state + store user token in localStorage
        this.authService.loggedIn(this.users[i].username, this.users[i].token);

        // redirect to dashboard
        this.router.navigate(['/dashboard']);

      } else {
        this.errorState = true;
        this.errorMessage = "This user does not exist"
      }
    }

  }

}
