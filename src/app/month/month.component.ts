import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './month.component.html',
  styleUrl: './month.component.css'
})
export class MonthComponent {


  @Input() Month: string = '';
  @Output() MonthChange = new EventEmitter<string>();

  MonthList = [
    { value: '1', viewValue: 'January' },
    { value: '2', viewValue: 'February' },
    { value: '3', viewValue: 'March' },
    { value: '4', viewValue: 'April' },
    { value: '5', viewValue: 'May' },
    { value: '6', viewValue: 'June' },
    { value: '7', viewValue: 'July' },
    { value: '8', viewValue: 'August' },
    { value: '9', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'December' },
  ];

  //สำหรับการเปลี่ยนค่า
  onChangeMonth(month: string) {
    this.Month = month;
    this.MonthChange.emit(month);
  }

}
