import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private postBookingUrl: string;
  private getAdminBookingUrl: string;
  private acceptBookingUrl: string;
  private bookingHistoryUrl: string;

  constructor(private http: HttpClient) { 
    this.postBookingUrl = 'http://localhost:8080/booking/create';
    this.getAdminBookingUrl ="http://localhost:8080/booking";
    this.acceptBookingUrl = "http://localhost:8080/booking/accept"
    this.bookingHistoryUrl = "http://localhost:8080/booking/history"
  }
  public createBooking(booking: Booking) {
    return this.http.post<string>(this.postBookingUrl, booking);
  }
  public getAdminBooking() {
    return this.http.get<any>(this.getAdminBookingUrl);
  }
  public acceptBooking(data: any) {
    return this.http.put(this.acceptBookingUrl, data);
  }
  public bookinHistory(userId: number) {
    return this.http.get<any>('http://localhost:8080/booking/history/'+userId);
   //return this.http.get<any>(this.bookingHistoryUrl, userId);
  }
}
