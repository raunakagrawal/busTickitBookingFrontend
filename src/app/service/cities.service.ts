import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStateService } from './user-state.service';
import { City } from '../model/cities';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private getCitiesUrl: string;

  constructor(private http: HttpClient, private userStateService: UserStateService) { 
    this.getCitiesUrl = 'http://localhost:8080/cities';
  }
  public findAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.getCitiesUrl);
  }
}
