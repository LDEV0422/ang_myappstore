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

    // TODO: put this in ngonit in user component (navbar) to have access to it all the time
    // maintain state notwithstanding reload

    // TODO: 1 token for all users ?
    const token = localStorage.getItem('Tybalt_auth');

    // TODO: decode token to check if token corresponds to user (auth zero ?)
    this._isLoggedIn$.next(!!token);
    // console.log(this._isLoggedIn$);
  }

  // get users from db
  getUsers() {
    return this.http.get<any>("http://localhost:3000/users");
  }

  // loggedIn method = logged state + store user token in localStorage
  loggedIn(userName: any, userToken: any) {

    // BehaviorSubject which will be responsible to keep the state of the logged in user (logged in = true, false otherwise)
    this._isLoggedIn$.next(true);

    // store token in localStorage
    let userAuth = `${userName}_auth`;
    localStorage.setItem(userAuth, userToken);

  }


}
