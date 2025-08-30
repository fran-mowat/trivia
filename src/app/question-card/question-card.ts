import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnswerOption } from "../answer-option/answer-option";
import { CommonModule } from '@angular/common';
import { Question } from "../interfaces/question";

@Component({
  selector: 'app-question-card',
  imports: [AnswerOption, CommonModule],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss'
})
export class QuestionCard {
  @Input() apiUrl!: string; 
  @Input() questionCount!: number;

  questionValue = "";
  answerValues: Array<string> = [];
  answerStates: Array<"correct" | "incorrect" | "disabled" | "notSelected" | ""> = ["disabled", "disabled", "disabled", "disabled"];
  correctAnswerIndex = -1;
  questions: Array<Question> = [];
  token = "";

  answerSelected = false; 
  score = 0;
  questionNumber = 1; 
  state: "ready" | "answered" = "ready";

  @Output() triggerSummary = new EventEmitter<{ score: number }>();

  ngOnInit() {
    if (this.apiUrl){
      this.getToken();
      this.getQuestions();
    } else {
      this.questionValue = "Loading questions...";
    }
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
        this.answerStates = ["", "", "", ""];
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

      for (let i = 0; i < 4; i++){
        if (i === answerNumber && i === this.correctAnswerIndex){
          this.answerStates[i] = "correct";
          this.score++;
        } else if (i === answerNumber && i !== this.correctAnswerIndex){
          this.answerStates[i] = "incorrect";
        } else if (i === this.correctAnswerIndex){
          this.answerStates[i] = "notSelected";
        } else {
          this.answerStates[i] = "disabled";
        }
      };
    };
  };

  changeQuestion(): void {
    this.state = "ready";
    this.questionNumber++;
    this.setQuestion();
    this.answerSelected = false; 
    this.answerStates = ["", "", "", ""];

    const options = document.getElementsByTagName("app-answer-option");
    Array.from(options).forEach(answerOption => {
      let answerValue = answerOption.firstChild as HTMLElement; 
      answerValue.classList = "";
    });
  };
};
