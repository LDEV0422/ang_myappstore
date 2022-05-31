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

  constructor(private http: HttpClient) { }

  // get users from db
  getUsers(){
    return this.http.get<any>("http://localhost:3000/users");
  }

  // loggedIn method = logged state
  loggedIn(){

    // BehaviorSubject which will be responsible to keep the state of the logged in user (logged in = true, false otherwise)
    this._isLoggedIn$.next(true);

  }


}
