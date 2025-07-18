import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-penalty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './penalty.component.html',
  styleUrl: './penalty.component.css'
})
export class PenaltyComponent {

  penaltyValue: number = 200;

  @Output() penaltyValueEvent = new EventEmitter<number>();

  ngOnInit() {
    this.penaltyValueEvent.emit(this.penaltyValue);
  }

}
