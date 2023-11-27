import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PreviewbookingComponent } from '../previewbooking/previewbooking.component';
import { MatDialog } from '@angular/material/dialog';
import { City } from '../model/cities';
import { CitiesService } from '../service/cities.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  dynamicForm!: FormGroup;
  submitted = false;
  todayDate: Date = new Date();
  lastDate : Date = new Date();
  formarray! : FormArray;
  numberOfTickets: number = 0;
  cities: City[] =[];
  destinationCities: City[] = [];
  distance!: number;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private citiesService: CitiesService, private datePipe: DatePipe) { }

  ngOnInit() {
      this.dynamicForm = this.formBuilder.group({
        from: ['', Validators.required],
        destination: ['', Validators.required],
        journeyDate: ['', Validators.required],
        numberOfTickets: ['', Validators.required],
        tickets: new FormArray([]),
        distance: '',
        user: ''
      });
      this.lastDate.setDate(this.todayDate.getDate()+30);

      this.citiesService.findAllCities().subscribe(data => {
        this.cities = data;
      })
      
  }
  get t(): FormGroup[] {
    const formArray = this.dynamicForm?.get('tickets') as FormArray;
    return formArray.controls as FormGroup[];
 }

  onChangeTickets(e: any) {
    this.numberOfTickets = e.value || 0;
    this.formarray = this.dynamicForm?.get('tickets') as FormArray;

    if (this.formarray.controls.length < this.numberOfTickets) {
      for (let i = this.formarray.controls.length; i < this.numberOfTickets; i++) {
        const newTicket = this.formBuilder.group({
          name: ['', Validators.required],
          age: ['', [Validators.required]],
          gender: ['', [Validators.required]],
        },);
        this.formarray.push(newTicket);
      }
    } else if (this.formarray.controls.length > this.numberOfTickets) {
      const ticketsToRemove = this.formarray.controls.length - this.numberOfTickets;
      for (let i = 0; i < ticketsToRemove; i++) {
        this.formarray.removeAt(this.formarray.controls.length - 1);
      }
    }
  }
oncityChange(e: any){
    this.destinationCities = this.cities.filter((item) => item.id !== e.value);
    this.getDistance()
}
getDistance(){
  const startcity = this.dynamicForm.value.from ;
  const endtcity = this.dynamicForm.value.destination;

  const start = this.cities.find((city: any) => city.id === startcity);
  const end = this.cities.find((city: any) => city.id === endtcity);
  if (start !== undefined && end !== undefined) {
    const startDistande = start.distance;
    const endDistande = end.distance;
    this.distance = endDistande - startDistande;
  }
  }
  
  openPreview(){
    const dateString = this.dynamicForm.get('journeyDate')!.value;
    const formattedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd');

    this.dynamicForm.get('journeyDate')!.setValue(formattedDate);
    this.dynamicForm.get('distance')!.setValue(this.distance);
    this.dynamicForm.get('user')!.setValue(this.distance);
    
    const dialogRef = this.dialog.open(PreviewbookingComponent, { 
      data: this.dynamicForm.value,
      width: '60%',
      height: '70%'
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.dynamicForm.reset;
    });
  }
}
