import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // ***** SET BEHAVIORSUBJECT ***** //
  // BehaviorSubject is private to protect it from external changes (default state = false)
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  // public observable to register the subscribers (based on the BS)
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
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

  getAllUsers(){
    this.authService
    .getUsers()
    .subscribe((response) => {
      this.users = response;
    })
  }

 
  submitLoginForm(){

    // *********** LOGIN FORM VALIDATION  *********** //
     // if form is invalid (empty inputs), early exit
     if(this.form.invalid){
      this.errorState = true;
      this.errorMessage = "Please indicate username and password"
      return;      
    } 

    // check username and password
    for (let i = 0; i < this.users.length; i++) {
      // console.log(this.users[i]);
      if(this.form.get('username')?.value === this.users[i].username && this.form.get('password')?.value === this.users[i].password){

        // if user exists TODO: erase this
        console.log("User exists : " + this.users[i].username + " with token " + this.users[i].token);

        // BehaviorSubject which will be responsible to keep the state of the logged in user (logged in = true, false otherwise)
        this._isLoggedIn$.next(true);
        
        // put token in localStorage
        let userAuth = `${this.users[i].username}_auth`;
        localStorage.setItem(userAuth, this.users[i].token);

        // redirect to dashboard
        this.router.navigate(['/dashboard']);
      }else{
        this.errorState = true;
        this.errorMessage = "This user does not exist"
      }
    }

  }

}
