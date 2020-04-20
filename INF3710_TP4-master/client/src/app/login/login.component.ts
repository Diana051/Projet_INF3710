import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../../../common/tables/Login';
import { MemberBD } from "./../../../../common/tables/Member";
import { CommunicationService } from './../communication.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private communicationService: CommunicationService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  public login(email: string, password: string): void {
    const login: Login = {
      email: email,
      passWord: password
  };
    let member: MemberBD = { } as MemberBD;
    this.communicationService.login(login).subscribe((res: {access: boolean, members: MemberBD[]}) => {
      if (res.access) {
        this.authService.authentificationState = true;
        member = res.members[0];
        this.authService.user = {member: member, memberType: undefined };
        this.router.navigate(['/home']);
      }
  });
  }

}
