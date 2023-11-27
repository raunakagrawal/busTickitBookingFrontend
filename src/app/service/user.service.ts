import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable, tap } from 'rxjs';
import { loginUser } from '../model/loginUser';
import { SignUpUser } from '../model/signupuser';
import { UserStateService } from './user-state.service';
import { Router } from '@angular/router';
@Injectable()
export class UserService {

  private usersUrl: string;
  private loginUrl: string;
  private signupUrl: string;

  constructor(private http: HttpClient, private userStateService: UserStateService, private router: Router) {
    this.usersUrl = 'http://localhost:8080/users/all';
    this.loginUrl = 'http://localhost:8080/users/login';
    this.signupUrl = 'http://localhost:8080/users/create';
    
  }

  public findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
  public login(loginUser: loginUser): Observable<User> {
    return this.http.post<User>(this.loginUrl, loginUser)
      .pipe(
        tap((user: User) => {
          this.userStateService.setLoggedInUser(user);
        })
      );
  }

  public logout(): void {
    this.userStateService.clearLoggedInUser();
  }
  public signUp(SignUpUser: SignUpUser){
    return this.http.post<SignUpUser>(this.signupUrl, SignUpUser);
  }
}