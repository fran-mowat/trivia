import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.html',
  styleUrl: './question.scss'
})
export class Question {
  @Input() question: string = "";
}
