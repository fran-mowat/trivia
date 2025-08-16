import { Component } from '@angular/core';
import { AnswerOption } from "../answer-option/answer-option";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-card',
  imports: [AnswerOption, CommonModule],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss'
})
export class QuestionCard {
  optionNumberValues: Array<string> = ["A", "B", "C", "D"];
  questionValue: string = "question...";
  answerValues: Array<string> = ["option 1", "number 2", "3", "last answer"];
  selectedAnswer: number = 0; 
  score: number = 0;
  questionNumber: number = 0; 
  questionCount: number = 10; 
  state: "ready" | "answered" = "ready";

  selectAnswer(answerNumber: number): void {
    this.selectedAnswer = answerNumber;
    this.state = "answered";
    const options = document.getElementsByTagName("app-answer-option");

    for (let i = 0; i < options.length; i++){
      let answerOption = options[i].firstChild as HTMLElement; 
      if (i === this.selectedAnswer){
        answerOption.classList.add("correct");
      } else {
        answerOption.classList.add("disabled");
      }
    };
  };

  changeQuestion(): void {
    this.state = "ready";
    this.answerValues = ["new option 1", "new number 2", "new 3", "new no 4"];
    this.questionNumber++; 

    const options = document.getElementsByTagName("app-answer-option");
    Array.from(options).forEach(answerOption => {
      let answerValue = answerOption.firstChild as HTMLElement; 
      answerValue.classList = "";
    });
  };
};
