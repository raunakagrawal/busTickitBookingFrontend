import { Component, OnInit} from '@angular/core';
import { BookingService } from '../service/booking.service';
import { adminPassanger } from '../model/adminPassanger';
import { DatePipe } from '@angular/common'
import { UserStateService } from '../service/user-state.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { MatSnackBar} from '@angular/material/snack-bar';

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
  selectedDate: Date = new Date;
  loggedInUser!: User;
  datarecieved!: any;
  dataToSend!:  any;
  day! : number;

  constructor(private SnackBar: MatSnackBar, private bookingService: BookingService, private datepipe: DatePipe,private userStateService: UserStateService, private router: Router){}

  async ngOnInit() {
    this.userStateService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user!;
      if(this.loggedInUser==null){
        this.router.navigate(['/login']);
      }
    });
    try {
      const data = await this.bookingService.getAdminBooking().toPromise();
      this.bookings = data.data;
      this.dataLoaded = true;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  displayedColumns: string[] =['srno','date', 'from', 'destination', 'name', 'age', 'gender', 'fare'];

  filterData() {
    const selectedDate = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
    this.day = this.selectedDate.getDate();
    console.log(this.day)
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
    const selectedDate = this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
    if(this.day % 2 !== 0){
      const passangerIds = this.filteredData.map((entry: { passangerId: any; }) => entry.passangerId);     
      this.dataToSend ={
        passangerIds: passangerIds,
        date: selectedDate
      } 
    }else {
      const passangerIds = this.filteredDataReturnJourney.map((entry: { passangerId: any; }) => entry.passangerId);
      this.dataToSend ={
        passangerIds: passangerIds,
        date: selectedDate
      }
    }
    this.bookingService.acceptBooking(this.dataToSend).subscribe(data=>{
      this.datarecieved = data;
      if(this.datarecieved.status == 200){
        this.SnackBar.open(this.datarecieved.message, 'Ok', {
          panelClass: 'my-custom-snackbar',
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000
      });
      this.ngOnInit()
      }else {
        this.SnackBar.open("Some Error Accepting", 'Ok', {
          panelClass: 'my-custom-snackbar',
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000
      });
      }
    });
  }
}
