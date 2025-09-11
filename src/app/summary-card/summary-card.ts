import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.scss',
})
export class SummaryCard implements OnInit {
  score = input.required<number>();
  questionCount = input.required<number>();
  category = input.required<string>();
  difficulty = input.required<string>();

  percentage!: number;

  @Output() playAgain = new EventEmitter();

  ngOnInit() {
    this.percentage = (this.score() / this.questionCount()) * 100;
    const percentageDisplay = document.getElementsByClassName('percentage')[0];
    percentageDisplay.innerHTML = '0%';

    const scoreDisplay = document.getElementsByClassName('score')[0];
    scoreDisplay.innerHTML =
      this.score() > 0 ? '' : `${this.score}/${this.questionCount}`;

    let count = 0;

    const interval = setInterval(() => {
      if (count < this.percentage) {
        percentageDisplay.innerHTML = `${count.toFixed(0)}%`;
        document.documentElement.style.setProperty(
          '--quiz-percentage',
          `${count}%`
        );
        document.documentElement.style.setProperty(
          '--quiz-percentage-point',
          `${count + 0.1}%`
        );
        count += 0.2;
      } else {
        clearInterval(interval);

        if (this.percentage === 0) {
          document.documentElement.style.setProperty('--quiz-percentage', '0%');
          document.documentElement.style.setProperty(
            '--quiz-percentage-point',
            '0%'
          );
        } else if (this.percentage === 100) {
          document.documentElement.style.setProperty(
            '--quiz-percentage',
            '100%'
          );
          document.documentElement.style.setProperty(
            '--quiz-percentage-point',
            '100.1%'
          );
        }

        scoreDisplay.innerHTML = `${this.score}/${this.questionCount}`;
      }
    }, 1);
  }
}
