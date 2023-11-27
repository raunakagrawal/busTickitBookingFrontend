import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})    
export class UserStateService {
  private loggedInUserSubject = new BehaviorSubject<User | null>(null);
  loggedInUser$: Observable<User | null> = this.loggedInUserSubject.asObservable();

  setLoggedInUser(user: User): void {
    this.loggedInUserSubject.next(user);
  }

  getLoggedInUser(): User | null {
    return this.loggedInUserSubject.getValue();
  }

  clearLoggedInUser(): void {
    this.loggedInUserSubject.next(null);
  }
}
