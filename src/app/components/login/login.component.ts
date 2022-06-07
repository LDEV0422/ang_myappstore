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

  // login form
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });

  // users
  users: any;
  loginUser: any;

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


    // check mail
    this.authService.getUserCredentials(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe({
        next: (response) => {
          this.loginUser = response;
          
          if (this.loginUser.length == 0) {
            console.log("credentials are incorrect");
            this.errorState = true;
            this.errorMessage = "This combination of email and password is unknown"
          } else {
            // to access token property (users is an array of object, use index to access object properties(0 here because you only get 1 user in array))
            this.authService.loggedIn(this.loginUser[0].token);
            // redirect to dashboard
            this.router.navigate(['/dashboard']);
          }
        },
        error: () => {
          this.errorState = true;
          this.errorMessage = "An error occurred during login, please retry"
        }
      })
  }

}
