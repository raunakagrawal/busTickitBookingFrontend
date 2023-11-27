import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { loginUser } from '../model/loginUser';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserStateService } from '../service/user-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');
  loginUser!: loginUser; 
  logedInUser!: User;
  loggedInUser!: User;

  constructor(private UserService : UserService, private router: Router, private userStateService: UserStateService ) {}

  ngOnInit() {
    this.userStateService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user!;
      if(this.loggedInUser!==null){
        this.router.navigate(['/dashboard']);
      }
    });
  }

  public login() {
    const email1 = this.email.value;
    const password1 = this.password.value;
    console.log(email1, password1)
    this.loginUser = {
      email: email1!,
      password : password1!
    };
    this.UserService.login(this.loginUser).subscribe(data =>{
      this.logedInUser = data;
      console.log(data);
      if(this.logedInUser !== null){
        console.log(this.logedInUser);
        alert("login successfull");
        this.router.navigate(['/dashboard']);
      }else{
        alert("Incorrect Email or Password");
      }
    });
  }
}
