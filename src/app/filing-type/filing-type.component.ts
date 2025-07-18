import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonthComponent } from '../month/month.component';
import { YearComponent } from '../year/year.component';

@Component({
  selector: 'app-filing-type',
  standalone: true,
  imports: [FormsModule,CommonModule,MonthComponent,YearComponent],
  templateUrl: './filing-type.component.html',
  styleUrl: './filing-type.component.css'
})
export class FilingTypeComponent {

  filingType: string = '0';

  @Output() typeChange = new EventEmitter<string>();

  onChangeType(type: string) {
    this.filingType = type;
    this.typeChange.emit(type);
  }

}
