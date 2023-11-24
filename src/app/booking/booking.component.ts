import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.dynamicForm = this.formBuilder.group({
        from: ['', Validators.required],
        destination: ['', Validators.required],
        journetDate: ['', Validators.required],
        numberOfTickets: ['', Validators.required],
        tickets: new FormGroup([])
      });
      this.lastDate.setDate(this.todayDate.getDate()+30)
      console.log(this.lastDate);
  }
  get t(): FormGroup[] {
    const formArray = this.dynamicForm?.get('tickets') as FormArray;
    return formArray.controls as FormGroup[];
 }
  onChangeTickets(e: any) {
      const numberOfTickets = e.value || 0;
      if (this.t.length < numberOfTickets) {
          for (let i = 0; i < numberOfTickets; i++) {
              this.t.push(this.formBuilder.group({
                  name: ['', Validators.required],
                  age: ['', [Validators.required]],
                  gender: ['', [Validators.required]],
              }));
          }
      }
  }
  onSubmit() {
      this.submitted = true;
      const values = this.t.map((formGroup) => formGroup.getRawValue());
      console.log(values);
      console.log(this.dynamicForm.value)
  }
}
