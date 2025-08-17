import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionCard } from "./question-card/question-card";
import { Settings } from "./settings/settings";
import { SummaryCard } from './summary-card/summary-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuestionCard, Settings, SummaryCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  screenMode: "settings" | "questions" | "review" = "settings";
  url: string = "";

  startQuestions(url: string){
    this.screenMode = "questions";
    this.url = url; 
  };
};
