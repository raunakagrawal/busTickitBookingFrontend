import { Component } from '@angular/core';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent {
  data = [
    { date: new Date('2023-11-25'), value: 10 },
    { date: new Date('2023-11-25'), value: 15 },
  ];
  get filteredData() {
    return this.data.filter(entry => entry.date.toDateString());
  }
}
