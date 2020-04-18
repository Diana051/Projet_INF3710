import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './../communication.service';
import { Login } from '../../../../common/tables/Login';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

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
  this.communicationService.login(login).subscribe((res: boolean) => {
      if (res)
      {
        this.authService.authentificationState = true;
        this.router.navigate(['/home']);
      }
  });

  }

}
