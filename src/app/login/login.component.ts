import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { loginUser } from '../model/loginUser';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserStateService } from '../service/user-state.service';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');
  loginUser!: loginUser; 
  logedInUser!: User;
  loggedInUser!: User;

  constructor(private UserService : UserService, private router: Router, private userStateService: UserStateService, private snackBar: MatSnackBar ) {}

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
    this.loginUser = {
      email: email1!,
      password : password1!
    };
    this.UserService.login(this.loginUser).subscribe(data =>{
      this.logedInUser = data;
      if(this.logedInUser !== null){
        this.snackBar.open( 'login successfull', 'Ok', {
          panelClass: 'my-custom-snackbar',
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000
        });
        this.router.navigate(['/dashboard']);
      }else{
        this.snackBar.open( 'Incorrect Email or Password', 'Ok', {
          panelClass: 'my-custom-snackbar',
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000
        });
      }
    });
  }
}
