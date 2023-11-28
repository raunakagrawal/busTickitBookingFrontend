import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { UserStateService } from '../service/user-state.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { BookingService } from '../service/booking.service';
import { CitiesService } from '../service/cities.service';
import { City } from '../model/cities';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-previewbooking',
  templateUrl: './previewbooking.component.html',
  styleUrls: ['./previewbooking.component.css']
})
export class PreviewbookingComponent implements OnInit{
  constructor(private citiesService: CitiesService, private snackBar: MatSnackBar , private dialogRef: MatDialogRef<PreviewbookingComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe, private userStateService: UserStateService, private router: Router, private bookingservice: BookingService) {}

  loggedInUser!: User;
  cities: City[] =[];
  departure!: String;
  destination!: String;
  response!: string;
  responseData!: any;

  ngOnInit() {
    this.userStateService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user!;
      if(this.loggedInUser==null){
        this.router.navigate(['/login']);
      }
    });
    this.citiesService.findAllCities().subscribe(city => {
      this.cities = city;
      this.departure =  this.cities.find((city: any) => city.id === this.data.from)?.cityName!;
      this.destination =  this.cities.find((city: any) => city.id === this.data.destination)?.cityName!;
    });
  }

  displayedColumns: string[] = ['passengerName', 'gender','age','fare'];
  
  formattedDate = this.datePipe.transform(this.data.journeyDate , 'mediumDate');

  ticketDetails = {
    departureDate: this.formattedDate,
    distance : Math.abs(this.data.distance),
    numberOfTickets: this.data.numberOfTickets
  };
  
  ticketDataArray = this.data.tickets.map((item: { name: any; gender: any; age: any; }) => ({
    name: item.name,
    gender: item.gender,
    age: item.age,
    fare: this.calculateFare(item.age)
  }));

  ticketData = new MatTableDataSource(this.ticketDataArray);

  calculateFare(age: number): number {
    if(age < 7){
      return Math.abs(this.data.distance * 3);
    }else if(age > 50){
      return Math.abs(this.data.distance * 5);
    }
    return Math.abs(this.data.distance * 7);
  }
  getGender(gender: string) {
    if(gender == 'm'){
      return "Male";
    }else{
      return "Female";
    }
  }

  get totalFare(): number {
    return this.ticketDataArray.reduce((acc: any, item: { fare: any; }) => acc + item.fare, 0);
  }

  onConfirm(){
    const booking = {
      id: 0,
      destination: this.data.destination,
      distance: this.data.distance,
      from: this.data.from,
      journeyDate: this.data.journeyDate,
      numberOfTickets: this.data.numberOfTickets,
      user: this.loggedInUser.id,
      tickets: this.ticketDataArray
    }

    this.bookingservice.createBooking(booking).subscribe(data => {
      this.responseData = data;
      if(this.responseData.data == null){
        this.snackBar.open( this.responseData.message, 'Ok', {
          panelClass: 'my-custom-snackbar',
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000
      });
      this.dialogRef.close({data: true});
    }
  });
}
}