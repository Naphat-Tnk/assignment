import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-surcharge',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './surcharge.component.html',
  styleUrl: './surcharge.component.css'
})
export class SurchargeComponent {

  @Input() taxamount: number = 0;
  @Output() surcharge = new EventEmitter<number>();

  
  surchargeValue: number = 0;
  surchargeformat: string = '';

  ngOnChanges(changes: SimpleChanges) {
      if(changes['taxamount'].currentValue){
        this.surchargeValue = parseFloat((this.taxamount * 0.1).toFixed(2));
        this.surchargeformat = this.format(this.surchargeValue);
        this.surcharge.emit(this.surchargeValue);
      }
    }

    format(num: number): string {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
}
