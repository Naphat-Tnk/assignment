import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent {

  
    @Input() Typebase: string = '';
    @Output() TypeChange = new EventEmitter<string>();
  
    TypeList = [
      { value: '1', viewValue: 'late' },
      { value: '0', viewValue: 'on time' },

    ];
  
    //สำหรับการเปลี่ยนค่า
    onChangeType(type: string) {
      this.Typebase = type;
      this.TypeChange.emit(type);
    }

}
