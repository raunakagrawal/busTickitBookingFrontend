import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../service/user-state.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  loggedInUser!: User;
  constructor(private userStateService: UserStateService, private router: Router){};
  ngOnInit(){
    this.userStateService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user!;
      if(this.loggedInUser==null){
        this.router.navigate(['/login']);
      }
    });
  }

}
