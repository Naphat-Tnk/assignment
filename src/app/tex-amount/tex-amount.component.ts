import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tex-amount',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tex-amount.component.html',
  styleUrl: './tex-amount.component.css'
})
export class TexAmountComponent {

  
  @Output() taxamount = new EventEmitter<number>();
  @Input() calvat: number = 0;

  taxValue: string = '';


  ngOnChanges(changes: SimpleChanges) {
    if(changes['calvat'].currentValue){
      this.taxValue = this.format(this.calvat);
    }
  }

  onInput(event: any) {
    let raw = event.target.value;
    let cleaned = raw.replace(/[^0-9.]/g, '');
 
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      this.taxValue = parts[0] + '.' + parts.slice(1).join('');
    } else {
      this.taxValue = cleaned;
    }
    event.target.value = this.taxValue;
   }

  onFocus(event: any) {
    this.taxValue = this.taxValue.replace(',', '');
  }

  onBlur(event: any) {
    const value = this.taxValue?.replace(/,/g, '') || '0';
    const tex = parseFloat(value);

    const over = tex - this.calvat;
    if(over > +20 || over < -20){
      alert('Invalid Tax');
      this.taxValue = this.format(this.calvat);
      return;
    }
    this.taxamount.emit(tex);
    event.target.value = this.format(tex);
   }

   format(num: number): string {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

}
