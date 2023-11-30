import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingComponent } from './booking/booking.component';
import { AdminComponent } from './admin/admin.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { PreviewbookingComponent } from './previewbooking/previewbooking.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'history', component: BookinghistoryComponent },
  { path: 'preview', component: PreviewbookingComponent },
  { path: 'adminhistory', component: AdminHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 