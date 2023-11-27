import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private rolesUrl: string;

  constructor(private http: HttpClient) {
    this.rolesUrl = 'http://localhost:8080/roles/all';
  }

  public findAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesUrl);
  }
}