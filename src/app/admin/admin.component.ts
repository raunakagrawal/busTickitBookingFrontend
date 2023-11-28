import { Component, OnInit} from '@angular/core';
import { BookingService } from '../service/booking.service';
import { adminPassanger } from '../model/adminPassanger';
import { DatePipe } from '@angular/common'
import { UserStateService } from '../service/user-state.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  bookings! : adminPassanger[];
  dataLoaded = false;
  filteredDataReturnJourney: any;
  filteredData!: any;
  totalFare!: number;
  totalFareReturnJourney!: number;
  selectedDate!: Date;
  loggedInUser!: User;

  constructor(private bookingService: BookingService, private datepipe: DatePipe,private userStateService: UserStateService, private router: Router){}

  async ngOnInit() {
    this.userStateService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user!;
      if(this.loggedInUser==null){
        this.router.navigate(['/login']);
      }
    });
    try {
      const data = await this.bookingService.getAdminBooking().toPromise();
      this.bookings = data;
      this.dataLoaded = true;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  }
  
  displayedColumns: string[] =['srno','date', 'from', 'destination', 'name', 'age', 'gender', 'fare'];

  filterData() {
    const selectedDate = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');

    this.filteredData = this.bookings.filter(entry => {
        const entryDate = new Date(entry.date);
        const entryDateString = this.datepipe.transform(entryDate, 'yyyy-MM-dd');
        return entryDateString === selectedDate && entry.journeyType === true;
      }).sort((a, b) => b.fare - a.fare);
    
    this.filteredData.slice(0, 25);
    this.totalFare = this.filteredData.reduce((acc: any, item: { fare: any; }) => acc + item.fare, 0);
    this.filteredDataReturnJourney = this.bookings.filter(entry => {
        const entryDate = new Date(entry.date);
        const entryDateString = this.datepipe.transform(entryDate, 'yyyy-MM-dd');
        return entryDateString === selectedDate && entry.journeyType === false;
      }).sort((a, b) => b.fare - a.fare);
    this.filteredDataReturnJourney.slice(0, 25);
    this.totalFareReturnJourney = this.filteredDataReturnJourney.reduce((acc: any, item: { fare: any; }) => acc + item.fare, 0);
  }

  acceptBookings(){
    if(this.totalFare > this.totalFareReturnJourney){
      const passangerIds = this.filteredData.map((entry: { passangerId: any; }) => entry.passangerId);
      const selectedDate = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
      const data ={
        passangerIds: passangerIds,
        date: selectedDate
      } 
      this.bookingService.acceptBooking(data).subscribe();
    }else {
      const passangerIds = this.filteredDataReturnJourney.map((entry: { passangerId: any; }) => entry.passangerId);
      const selectedDate = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
      const data ={
        passangerIds: passangerIds,
        date: selectedDate
      } 
      this.bookingService.acceptBooking(data).subscribe();
    }
  }
}
