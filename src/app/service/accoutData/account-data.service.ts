import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {

  id:string;
  password:string;

  constructor() { }

  setId(id:string){
    this.id=id;
  }
  setToken(pass:string){
    this.password=pass;
  } 

  getId():string{
    return this.id;
  }

  getToken():string{
    return this.password;
  }
}
