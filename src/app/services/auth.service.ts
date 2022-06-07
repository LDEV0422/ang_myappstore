import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ***** SET BEHAVIORSUBJECT ***** //
  // BehaviorSubject is private to protect it from external changes (default state = false)
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  // public observable to register the subscribers (based on the BS)
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _isLoggedOut$ = new BehaviorSubject<boolean>(false);
  isLoggedOut$ = this._isLoggedOut$.asObservable();


  // token management
  token: any;
  expToken: any;
  tokenPayload: any;

  // logged user management
  userLogged: any;


  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    // TODO: logged in state / logged out without page reload (user is logged but pb in header and local storage)

    // if (localStorage.length !== 0) {
      // maintain state notwithstanding reload
      this.token = localStorage.getItem('current_auth');

      // decode token to get user's role

      // TODO: role management
      
      
      // convert _isLoggedIn$ to a boolean to maintain state
      this._isLoggedIn$.next(!!this.token);

    // } else {
      
    //   this._isLoggedOut$.next(true);
    //   console.log("user out");
    // }
    if (this.token) {
      this.getTokenDecoded();
      
    } else {
       this._isLoggedOut$.next(true);
      
    }
  }

  // ********** HTTP METHODS ********** //
  // get all users from db
  getUsers() {
    return this.http.get<any>("http://localhost:3000/users");
  }

  // check user on login
  getUserCredentials(userEmail: any, userPW: any) {
    return this.http.get<any>(`http://localhost:3000/users?email=${userEmail}&password=${userPW}`);
  }

  // register new user
  registerUser(user: any){
    return this.http.post<any>("http://localhost:3000/users/", user);
  }

  // ********** END HTTP METHODS ********** //


  // loggedIn method = logged state + store user token in localStorage
  loggedIn(userToken: any) {
    // BehaviorSubject which will be responsible to keep the state of the logged in user (logged in = true, false otherwise)
    this._isLoggedIn$.next(true);
    // this._isLoggedOut$.next(true);

    // store token in localStorage
    let userAuth = "current_auth";
    localStorage.setItem(userAuth, userToken);
  }

  logOutUser() {
    localStorage.clear();
    this._isLoggedIn$.next(false);
  }

  // // decode token method
  getTokenDecoded() {
    this.expToken = this.token;
    // console.log(this.jwtHelper.decodeToken(this.expToken));
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.expToken));

    // to put username and role in localStorage
    this.userLogged = JSON.parse(this.tokenPayload);
    
    localStorage.setItem('username', this.userLogged.username);
    localStorage.setItem('roles', this.userLogged.roles)
  }

}
