import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-answer-option',
  imports: [],
  templateUrl: './answer-option.html',
  styleUrl: './answer-option.scss'
})
export class AnswerOption {
  @Input() optionNumber!: string; 
  @Input() answer: string = "";
  @Input() state: "incorrect" | "correct" | "" = "";
}
