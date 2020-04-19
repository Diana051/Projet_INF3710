import { Injectable } from '@angular/core';
import { Member, MemberType } from './../../../../common/tables/Member';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authentificationState: boolean = false;
  user :{member: Member, memberType:MemberType|undefined};
  constructor() { }

    isAuthenticated():boolean{
    return this.authentificationState;
  }
}
