import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.scss'
})
export class SummaryCard {
  @Input() score!: number; 
  @Input() questionCount!: number; 

  @Output() playAgain = new EventEmitter();
}
