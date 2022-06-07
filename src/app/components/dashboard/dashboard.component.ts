import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  allUsersData: any;

  // error message
  errorState: boolean = false;
  errorMessage!: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllUsersData();
  }

  getCurrentUser(){
    this.currentUser = this.authService.userLogged;
  }

  getAllUsersData(){
    this.authService.getUsers()
    .subscribe({
      next: (response) => {
        this.allUsersData = response;
      },
      error: () => {
        this.errorState = true;
        this.errorMessage = "An error occurred while fetching data";
      }
    })
  }

}
