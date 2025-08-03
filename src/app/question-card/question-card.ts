import { Component } from '@angular/core';
import { Question } from "../question/question";
import { AnswerOption } from "../answer-option/answer-option";

@Component({
  selector: 'app-question-card',
  imports: [Question, AnswerOption],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss'
})
export class QuestionCard {

}
