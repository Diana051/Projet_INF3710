import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authentificationState: boolean = false;
  constructor() { }

    isAuthenticated():boolean{
    return this.authentificationState;
  }
}
