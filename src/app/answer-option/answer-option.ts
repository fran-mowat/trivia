import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-answer-option',
  imports: [CommonModule],
  templateUrl: './answer-option.html',
  styleUrl: './answer-option.scss',
})
export class AnswerOption {
  optionNumber = input<string>();
  answer = input<string>();
  state = input<'incorrect' | 'correct' | 'disabled' | 'notSelected' | ''>();
}
