import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedOutState: any;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logOutUser() {
    this.authService.logOutUser();
    this.loggedOutState = this.authService.isLoggedIn$;
    this.loggedOutState = false;
    console.log("User is out");
  }

}
