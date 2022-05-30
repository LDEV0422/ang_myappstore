import { Injectable, } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  nState: boolean = false;
  nStateFalse: any;
  nContentSuccess = "Mission accomplished!";
  nContentFail = "An error occurred. Mission abort!";
  

  constructor() { 
    this.nStateFalse = setTimeout(() => {
      this.nState = false; console.log("test", this.nState);
    }, 6000); 
  }

  saveChangesNotifOK(nState: boolean) {

    nState = true;

    this.nStateFalse;
    console.log(this.nStateFalse)

    return nState;
  }

}
