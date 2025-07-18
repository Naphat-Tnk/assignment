import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-amount',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-amount.component.html',
  styleUrl: './total-amount.component.css'
})
export class TotalAmountComponent {

  @Input() surchargeValue: number = 0;
  @Input() penaltyValue: number = 0;
  @Input() taxValue: number = 0;

  @Output() totalAmountEvent = new EventEmitter<number>();

  totalAmountformat: string = '';
  totalAmount: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if(changes['surchargeValue'] || changes['penaltyValue'] || changes['taxValue']){
      this.totalAmount = this.surchargeValue + this.penaltyValue + this.taxValue;
      this.totalAmountformat = this.format(this.totalAmount);
      this.totalAmountEvent.emit(this.totalAmount);
    }
  }

  format(num: number): string {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
