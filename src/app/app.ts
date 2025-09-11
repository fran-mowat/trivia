import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionCard } from './question-card/question-card';
import { Settings } from './settings/settings';
import { SummaryCard } from './summary-card/summary-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuestionCard, Settings, SummaryCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  screenMode: 'settings' | 'questions' | 'review' = 'settings';
  url = '';
  score = 0;
  questionCount = 15;
  difficulty = 'mixed';
  categoryCode = 0;
  category = '';

  startQuestions(data: {
    url: string;
    questionCount: number;
    difficulty: string;
    categoryCode: number;
    category: string;
  }) {
    this.screenMode = 'questions';
    this.url = data.url;
    this.questionCount = data.questionCount;
    this.difficulty = data.difficulty;
    this.categoryCode = data.categoryCode;
    this.category = data.category;
  }

  startSummary(data: { score: number }) {
    this.screenMode = 'review';

    this.score = data.score;
  }
}
