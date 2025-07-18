import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sale-amount',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sale-amount.component.html',
  styleUrl: './sale-amount.component.css'
})
export class SaleAmountComponent {

  SaleAmount: string = '';

  @Output() vatcal = new EventEmitter<number>();
  @Output() saleAmountEvent = new EventEmitter<number>();

  onInput(event: any) {
   let raw = event.target.value;
   let cleaned = raw.replace(/[^0-9.]/g, '');

   const parts = cleaned.split('.');
   if (parts.length > 2) {
     this.SaleAmount = parts[0] + '.' + parts.slice(1).join('');
   } else {
     this.SaleAmount = cleaned;
   }
   event.target.value = this.SaleAmount;
  }

  onFocus(event: any) {
    this.SaleAmount = this.SaleAmount.replace(',', '');
  }

  onBlur(event: any) {
    const num = parseFloat(this.SaleAmount.replace(',', '')) || 0;
    this.SaleAmount = this.format(num);
    const vat =parseFloat((num * 0.07).toFixed(2));
    this.vatcal.emit(vat);
    this.saleAmountEvent.emit(num);
   }

   format(num: number): string {
    return num.toLocaleString('en-US',{
      minimumFractionDigits: 2,
      maximumFractionDigits: 30
    });
  }
}
