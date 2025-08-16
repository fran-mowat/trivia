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
  answerSelected: boolean = false; 
  score: number = 0;
  questionNumber: number = 0; 
  questionCount: number = 10; 
  state: "ready" | "answered" = "ready";

  selectAnswer(answerNumber: number): void {
    if (! this.answerSelected){
      this.answerSelected = true;
      this.state = "answered";
      const options = document.getElementsByTagName("app-answer-option");

      for (let i = 0; i < options.length; i++){
        let answerOption = options[i].firstChild as HTMLElement; 
        if (i === answerNumber){
          answerOption.classList.add("correct");
          this.score++;
        } else {
          answerOption.classList.add("disabled");
        }
      };
    };
  };

  changeQuestion(): void {
    this.state = "ready";
    this.answerValues = ["new option 1", "new number 2", "new 3", "new no 4"];
    this.questionNumber++; 
    this.answerSelected = false; 

    const options = document.getElementsByTagName("app-answer-option");
    Array.from(options).forEach(answerOption => {
      let answerValue = answerOption.firstChild as HTMLElement; 
      answerValue.classList = "";
    });
  };

  async getToken(): Promise<string> {
    return fetch("https://opentdb.com/api_token.php?command=request")
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data["token"];
    })
  };
};
