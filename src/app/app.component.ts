import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { UserStateService } from './service/user-state.service';
import { Router } from '@angular/router';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tickit Booking';
  loggedInUser!: User;

  constructor(private userService: UserService, private userStateService: UserStateService, public router: Router) {
  }
  ngOnInit() {
    this.userStateService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user!;
    });
  }
  public logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
 