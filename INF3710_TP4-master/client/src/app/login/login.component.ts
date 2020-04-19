import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../communication.service';
import { Login } from '../../../../common/tables/Login';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Member } from './../../../../common/tables/Member';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private communicationService:CommunicationService, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

  login(email:string, password:string){
    const login: Login = {
      email: email,
      passWord: password
  };
  let member: Member = { } as Member;
  this.communicationService.login(login).subscribe((res: {access:boolean, members:Member[]}) => {
    
    
      if (res.access)
      {
        this.authService.authentificationState = true;
        member = res.members[0];
        this.authService.user ={member:member, memberType:undefined }
        
        this.router.navigate(['/home']);
      }
  });
  

  }

}
