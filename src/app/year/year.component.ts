import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-year',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './year.component.html',
  styleUrl: './year.component.css'
})
export class YearComponent {

  
    @Input() Year: string = '';
    @Output() YearChange = new EventEmitter<string>();
  
    YearList = [
      { value: '2022', viewValue: '2022' },
      { value: '2023', viewValue: '2023' },
      { value: '2024', viewValue: '2024' },
      { value: '2025', viewValue: '2025' },
      { value: '2026', viewValue: '2026' },
      { value: '2027', viewValue: '2027' }
    ];
  
    //สำหรับการเปลี่ยนค่า
    onChangeYear(year: string) {
      this.Year = year;
      this.YearChange.emit(year);
    }

}
