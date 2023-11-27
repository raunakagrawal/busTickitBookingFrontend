import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private postBookingUrl: string;
  private getAdminBookingUrl: string;

  constructor(private http: HttpClient) { 
    this.postBookingUrl = 'http://localhost:8080/booking/create';
    this.getAdminBookingUrl ="http://localhost:8080/booking";
  }
  public createBooking(booking: Booking) {
    return this.http.post<string>(this.postBookingUrl, booking);
  }
  public getAdminBooking() {
    return this.http.get<any>(this.getAdminBookingUrl);
  }
}
