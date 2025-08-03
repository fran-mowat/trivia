import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionCard } from "./question-card/question-card";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuestionCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
