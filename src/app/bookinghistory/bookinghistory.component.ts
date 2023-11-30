import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../service/user-state.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { adminPassanger } from '../model/adminPassanger';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit{
  loggedInUser!: User;
  dataLoaded = false;
  bookings! : adminPassanger[];
  bookingsData! : any;
  constructor(private bookingService: BookingService ,private userStateService: UserStateService, private router: Router){};
  async ngOnInit(){
    this.userStateService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user!;
      if(this.loggedInUser==null){
        this.router.navigate(['/login']);
      }
    });
    try {
      const data = await this.bookingService.bookinHistory(this.loggedInUser.id).toPromise();
      this.bookings = data.data;
      this.dataLoaded = true;
      this.bookingsData = this.bookings.map(obj => {
        if (obj.status == true) {
          return {...obj, status: 'Accepted'};
         }
        if(obj.status == false){
          return {...obj, status: 'Waiting'};
        } else {
          return {...obj, status: 'Under Review'};
        }
         return obj;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  

}
