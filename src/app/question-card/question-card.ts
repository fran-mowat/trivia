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

  questionValue: string = "";
  answerValues: Array<string> = [];
  answerStates: Array<"correct" | "incorrect" | ""> = ["", "", "", ""];
  correctAnswerIndex: number = 0;
  questions: Array<Question> = [];
  token: string = "";

  answerSelected: boolean = false; 
  score: number = 0;
  questionNumber: number = 1; 
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
            this.answerStates[i] = "correct";
            this.score++;
          } else {
            answerOption.classList.add("incorrect");
            this.answerStates[i] = "incorrect";
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
    this.answerStates = ["", "", "", ""];

    const options = document.getElementsByTagName("app-answer-option");
    Array.from(options).forEach(answerOption => {
      let answerValue = answerOption.firstChild as HTMLElement; 
      answerValue.classList = "";
    });
  };
};
