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
  @Input() category!: string; 
  @Input() difficulty!: string;

  @Output() playAgain = new EventEmitter();

  ngOnInit() {
    let percentage = (this.score / this.questionCount) * 100;

    let percentageDisplay = document.getElementsByClassName("percentage")[0];
    percentageDisplay.innerHTML = "0%"; 

    let scoreDisplay = document.getElementsByClassName("score")[0];
    scoreDisplay.innerHTML = "";

    let count = 0; 

    const interval = setInterval(() => {
      if (count > percentage){
        clearInterval(interval);
        scoreDisplay.innerHTML = `${this.score}/${this.questionCount}`;
      } else {
        percentageDisplay.innerHTML = `${count.toFixed(0)}%`;
        document.documentElement.style.setProperty("--quiz-percentage", `${count}%`);
        document.documentElement.style.setProperty("--quiz-percentage-point", `${count + 0.1}%`);
        count += 0.2; 
      }
    }, 0.4);
  };

  
}
