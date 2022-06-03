import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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


  constructor(private http: HttpClient) {

    // maintain state notwithstanding reload
    const token = localStorage.getItem('Current_auth');

    // decode token to make sure token that we get from lS corresponds to current user's token
    
    // TODO: decode token to check if token corresponds to user (auth zero ?)
    this._isLoggedIn$.next(!!token);
    // console.log(this._isLoggedIn$);
  }

  // get users from db
  getUsers() {
    return this.http.get<any>("http://localhost:3000/users");
  }

  getUserCredentials(userEmail:any, userPW:any) {
    return this.http.get<any>(`http://localhost:3000/users?email=${userEmail}&password=${userPW}`);
  }

  // loggedIn method = logged state + store user token in localStorage
  loggedIn(userToken: any) {
    // BehaviorSubject which will be responsible to keep the state of the logged in user (logged in = true, false otherwise)
    this._isLoggedIn$.next(true);

    // store token in localStorage
    let userAuth = "Current_auth";
    localStorage.setItem(userAuth, userToken);
  }

}
