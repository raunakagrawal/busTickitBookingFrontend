import { Component, OnInit} from '@angular/core';
import { BookingService } from '../service/booking.service';
import { adminPassanger } from '../model/adminPassanger';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  bookings! : adminPassanger[];
  constructor(private bookingService: BookingService){}
  ngOnInit() {
    this.bookingService.getAdminBooking().subscribe(data=>{
      this.bookings = data;
    })
  }  
  selectedDate: Date = new Date();
  displayedColumns: string[] =['srno','date', 'from', 'destination', 'name', 'age', 'gender', 'fare'];

  data = [
    { date: new Date('2023-11-25'), value: 10 },
    { date: new Date('2023-11-25'), value: 15 },
  ];

  get filteredData() {
    console.log(this.bookings)
    return this.data.filter(entry => entry.date.toDateString() === this.selectedDate.toDateString());
  }
  get totalFare(): number {
    return this.filteredData.reduce((acc, item) => acc + item.value, 0);
  }
}
