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
    scoreDisplay.innerHTML = this.score > 0 ? "" : `${this.score}/${this.questionCount}`;

    let count = 0; 

    const interval = setInterval(() => {
      if (count < percentage){
        percentageDisplay.innerHTML = `${count.toFixed(0)}%`;
        document.documentElement.style.setProperty("--quiz-percentage", `${count}%`);
        document.documentElement.style.setProperty("--quiz-percentage-point", `${count + 0.1}%`);
        count += 0.2; 
      } else {
        clearInterval(interval);

        if (percentage === 0){
          document.documentElement.style.setProperty("--quiz-percentage", "0%");
          document.documentElement.style.setProperty("--quiz-percentage-point", "0%");
        } else if (percentage === 100){
          document.documentElement.style.setProperty("--quiz-percentage", "100%");
          document.documentElement.style.setProperty("--quiz-percentage-point", "100.1%");
        }
        
        scoreDisplay.innerHTML = `${this.score}/${this.questionCount}`;
      }
    }, 0.4);
  };
};
