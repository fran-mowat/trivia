import { AfterViewInit, Component, input, OnInit, output } from '@angular/core';
import { QuestionAnswerDetails } from '../interfaces/questionAnswerDetails';

@Component({
  selector: 'app-summary-card',
  imports: [],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.scss',
})
export class SummaryCard implements OnInit, AfterViewInit {
  score = input.required<number>();
  questionCount = input.required<number>();
  category = input.required<string>();
  difficulty = input.required<string>();
  questionSummaries = input.required<QuestionAnswerDetails[]>();

  percentage = 0;
  showQuestions = false;
  switchedView = false;

  percentageDisplay = '';
  scoreDisplay = '';

  playAgain = output();

  ngOnInit() {
    this.percentage = (this.score() / this.questionCount()) * 100;
  }

  ngAfterViewInit() {
    const percentageDisplay = document.getElementsByClassName('percentage')[0];
    const scoreDisplay = document.getElementsByClassName('score')[0];
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

        scoreDisplay.innerHTML = `${this.score()}/${this.questionCount()}`;
      }
    }, 1);
  }

  switchView() {
    this.showQuestions = !this.showQuestions;
    this.switchedView = true;

    if (!this.showQuestions) {
      this.percentageDisplay = `${this.percentage.toFixed(0)}%`;
      this.scoreDisplay = `${this.score()}/${this.questionCount()}`;
    }
  }
}
