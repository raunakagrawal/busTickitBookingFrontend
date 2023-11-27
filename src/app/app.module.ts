import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { BookinghistoryComponent } from './bookinghistory/bookinghistory.component';
import { PreviewbookingComponent } from './previewbooking/previewbooking.component';

import { UserService } from './service/user.service';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    BookingComponent,
    DashboardComponent,
    AdminComponent,
    BookinghistoryComponent,
    PreviewbookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,MatInputModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatDialogModule,
    ReactiveFormsModule,CommonModule,MatTableModule,MatIconModule,MatListModule,MatBadgeModule,MatSelectModule,
    MatRadioModule,MatDatepickerModule,MatNativeDateModule,MatSnackBarModule,MatToolbarModule,MatMenuModule,
    FormsModule

  ],
  providers: [DatePipe, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
