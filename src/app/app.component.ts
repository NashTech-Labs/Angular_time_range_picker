import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'multi-step-form';
  firstFormGroup!: FormGroup;
  hours:number[]=[]
  @ViewChild('startTimeSelect') startTimeSelect!: MatSelect;
  @ViewChild('endTimeSelect') endTimeSelect!: MatSelect;

  constructor(private fb: FormBuilder) {
    for (let i = 0; i <= 24; i++) {
      this.hours.push(i);
  }
 
   }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      age: [],
      startTime:[1, Validators.required],
      endTime:[24,[Validators.max(24), (control: AbstractControl) => {
        const startTimeControl = this.firstFormGroup?.get('startTime');
        return startTimeControl && control.value > startTimeControl.value ? null : { endTimeLessThanStartTime: true }
      }
      ]]
    });

    this.firstFormGroup.get('startTime')?.valueChanges.subscribe(() => {
      if (this.firstFormGroup.get('startTime')?.value) {
          this.startTimeSelect?.close();
          this.endTimeSelect.value = ''
          this.endTimeSelect?.open();
      }
  });
  }

  onSubmit() {
    console.log(this.firstFormGroup.value);
  }
  openBothDropdowns() {
    this.startTimeSelect.open();
}
}
