import { Component } from '@angular/core';
import { AnswerOption } from "../answer-option/answer-option";

@Component({
  selector: 'app-question-card',
  imports: [AnswerOption],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss'
})
export class QuestionCard {
  optionNumberValues: Array<string> = ["A", "B", "C", "D"];
  questionValue: string = "question...";
  answerValues: Array<string> = ["option 1", "number 2", "3", "last answer"];
  selectedAnswer: number = 0; 

  changeSelectedAnswer(newSelection: number): void {
    const options = document.getElementsByTagName("app-answer-option");

    const oldSelectedAnswer = options[this.selectedAnswer].firstChild as HTMLElement;
    oldSelectedAnswer.classList.remove("selected");

    this.selectedAnswer = newSelection;
    const newSelectedAnswer = options[this.selectedAnswer].firstChild as HTMLElement; 
    newSelectedAnswer.classList.add("selected");
  }
}
