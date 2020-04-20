import { Injectable } from '@angular/core';
import {MemberType, MemberBD } from './../../../../common/tables/Member';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authentificationState: boolean = false;
  user :{member: MemberBD, memberType: MemberType|undefined};
  constructor() { }

    isAuthenticated():boolean{
    return this.authentificationState;
  }
}
