import { Component, Input } from '@angular/core';
import { AnswerOption } from "../answer-option/answer-option";
import { CommonModule } from '@angular/common';
import { Question } from "./question";

@Component({
  selector: 'app-question-card',
  imports: [AnswerOption, CommonModule],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss'
})
export class QuestionCard {
  @Input() apiUrl!: string; 

  optionNumberValues: Array<string> = ["A", "B", "C", "D"];

  questionValue: string = "";
  answerValues: Array<string> = [];
  correctAnswerIndex: number = 0;
  questions: Array<Question> = [];
  token: string = "";

  answerSelected: boolean = false; 
  score: number = 0;
  questionNumber: number = 1; 
  questionCount: number = 10; 
  state: "ready" | "answered" = "ready";

  constructor() {
    const interval = setInterval(() => {
      if (this.apiUrl){
        clearInterval(interval);
        this.getToken();
        this.getQuestions();
      } else {
        this.questionValue = "Loading questions...";
      }
    }, 100);
    
  };

  async getToken() {
    await fetch("https://opentdb.com/api_token.php?command=request")
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.token = data["token"];
    })
  };

  async getQuestions() {
    fetch(`${this.apiUrl}&token=${this.token}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.questions = data.results;

        this.setQuestion();
      }); 
  };

  setQuestion() {
    let nextQuestion = this.questions[this.questionNumber - 1];
    this.questionValue = this.decodeHTML(nextQuestion["question"]);

    let answers = nextQuestion["incorrect_answers"];
    this.correctAnswerIndex = Math.floor(Math.random() * 4); 
    answers.splice(this.correctAnswerIndex, 0, nextQuestion["correct_answer"]);

    answers.forEach((answer, i) => {
      answers[i] = this.decodeHTML(answer);
    });
    
    this.answerValues = answers;
  };

  decodeHTML(encodedValue: string): string {
    const parser = new DOMParser(); 
    const decodedString = parser.parseFromString(encodedValue, "text/html").documentElement.textContent || ""; 
    return decodedString;
  };

  selectAnswer(answerNumber: number): void {
    if (! this.answerSelected){
      this.answerSelected = true;
      this.state = "answered";
      const options = document.getElementsByTagName("app-answer-option");

      for (let i = 0; i < options.length; i++){
        let answerOption = options[i].firstChild as HTMLElement; 
        if (i === answerNumber){
          if (i === this.correctAnswerIndex){
            answerOption.classList.add("correct");
            this.score++;
          } else {
            answerOption.classList.add("incorrect");
          }
        } else {
          answerOption.classList.add("disabled");
        }
      };
    };
  };

  changeQuestion(): void {
    this.state = "ready";
    this.questionNumber++;
    this.setQuestion();
    this.answerSelected = false; 

    const options = document.getElementsByTagName("app-answer-option");
    Array.from(options).forEach(answerOption => {
      let answerValue = answerOption.firstChild as HTMLElement; 
      answerValue.classList = "";
    });
  };
};
