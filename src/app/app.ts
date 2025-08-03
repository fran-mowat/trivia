import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Question } from "./question/question";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Question],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
