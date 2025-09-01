import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-answer-option',
  imports: [CommonModule],
  templateUrl: './answer-option.html',
  styleUrl: './answer-option.scss'
})
export class AnswerOption {
  @Input() optionNumber!: string; 
  @Input() answer = "";
  @Input() state: "incorrect" | "correct" | "disabled" | "notSelected" | "" = "";
}
