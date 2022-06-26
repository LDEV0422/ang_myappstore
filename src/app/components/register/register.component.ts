import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/providers/CustomValidators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // registration form
  registerForm = new FormGroup(
    {
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    confirmPassword: new FormControl('', Validators.required),
  },
  { validators: [CustomValidators.match('password', 'confirmPassword')]}
  );
  submitted = false;

  // new user
  newUser: any;

   // error message
   errorState: boolean = false;
   errorMessage!: string;

   // register message
   registerState: boolean = false;
   registerMessage!: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submitRegisterForm() {
    if (this.registerForm.invalid) {
      this.errorState = true;
      this.errorMessage = "Please fill in the form"
      return;
    }

    console.log(JSON.stringify(this.registerForm.value, null, 2));

    // TODO: handle form validation
    // this.authService.registerUser(this.registerForm)
    // .subscribe({
    //   next: (response) => {
    //     this.newUser = response;
    //     console.log(this.newUser);

        
    //     // stay on login page and show message (user can't login before token generation)
    //     this.registerState = true;
    //     this.registerMessage = "Registration was a success! Your account will be validated very soon, go to login page to check validation.";
    //     // add roles (= user) + empty "" for token
    //   },
    //   error: () => {
    //     this.errorState = true;
    //     this.errorMessage = "This combination of email and password is unknown";
    //   }
    // })
   
  }


  onReset(){
    this.submitted = false;
    this.errorState = false;
    this.errorMessage = "";

    this.registerForm.reset();
  }
}
