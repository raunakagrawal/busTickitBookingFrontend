import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { UserStateService } from '../service/user-state.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { adminPassanger } from '../model/adminPassanger';
import { BookingService } from '../service/booking.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.css']
})

export class AdminHistoryComponent implements OnInit {

  loggedInUser!: User;
  dataLoaded = false;
  bookings! : adminPassanger[];
  bookingsWithStatus! : any;
  bookingsData! : any;
  dataSource:any;

  displayedColumns: string[] = ['date','from','destination','name','age','gender','fare','journeyType','status'];

  constructor(private bookingService: BookingService ,private userStateService: UserStateService, private router: Router){}
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngOnInit(){
    this.userStateService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user!;
      if(this.loggedInUser==null){
        this.router.navigate(['/login']);
      }
    });
    try {
      const data = await this.bookingService.adminbookinHistory().toPromise();
      this.bookings = data.data;
      this.dataLoaded = true;
      this.bookingsWithStatus = this.bookings.map(obj => {
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
      
      this.bookingsData= this.bookingsWithStatus.map((obj: { journeyType: boolean; }) => {
        if(obj.journeyType == false){
          return {...obj, journeyType: 'Return'};
        } else {
          return {...obj, journeyType: 'Straight'};
        }
         return obj;
      }).sort((a: { status: String; },b: { status: String; }) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
      this.dataSource = new MatTableDataSource<any>(this.bookingsData);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  

}
