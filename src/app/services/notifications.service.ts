import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor() { }

  editProductNotif(mess: boolean){
    mess = true;
    // setTimeout(()=>{mess = false}, 5000);
    console.log("test");
    return mess;
  }

  deleteProductNotif(){

  }

  addProductNotif(){

  }
}
