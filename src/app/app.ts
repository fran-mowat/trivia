import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionCard } from "./question-card/question-card";
import { Settings } from "./settings/settings";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuestionCard, Settings],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
