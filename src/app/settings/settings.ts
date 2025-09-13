import { Component, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionDetails } from '../interfaces/questionDetails';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  questionCount = model(15);
  categoryCode = model(0);
  difficulty = model('mixed');

  category = '';
  validationMessage = '';

  categoryOptions = [
    { id: 0, name: 'Any Category' },
    { id: 9, name: 'General Knowledge' },
    { id: 21, name: 'Sports' },
    { id: 22, name: 'Geography' },
    { id: 23, name: 'History' },
    { id: 17, name: 'Science & Nature' },
    { id: 18, name: 'Computers' },
    { id: 19, name: 'Mathematics' },
    { id: 24, name: 'Politics' },
    { id: 20, name: 'Mythology' },
    { id: 27, name: 'Animals' },
    { id: 25, name: 'Art' }
  ];

  triggerQuestions = output<QuestionDetails>();

  validateQuestionCount() {
    const input = document.getElementById('question-count') as HTMLInputElement;
    this.validationMessage = input.validationMessage;

    const startButton = document.getElementById('start');
    if (this.validationMessage) {
      startButton?.classList.add('disabled');
    } else {
      startButton?.classList.remove('disabled');
    }
  }

  randomiseQuizSettings(){
    let questionCountOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50];
    questionCountOptions = questionCountOptions.filter(option => option != this.questionCount());
    let questionCountIndex = Math.floor(Math.random() * questionCountOptions.length);
    this.questionCount.set(questionCountOptions[questionCountIndex]);

    let selectedCategoryId; 

    do {
      let categoryIndex = Math.floor(Math.random() * this.categoryOptions.length);
      selectedCategoryId = this.categoryOptions[categoryIndex].id;
    } while (this.categoryCode() == selectedCategoryId);

    this.categoryCode.set(selectedCategoryId);

    let difficultyOptions = ['easy', 'medium', 'hard', 'mixed'];
    difficultyOptions = difficultyOptions.filter(option => option != this.difficulty());
    let difficultyIndex = Math.floor(Math.random() * difficultyOptions.length);
    this.difficulty.set(difficultyOptions[difficultyIndex]);
  }

  constructApiUrl() {
    if (this.questionCount() >= 10 && this.questionCount() <= 50) {
      let url = `https://opentdb.com/api.php?type=multiple&amount=${this.questionCount()}`;

      if (this.difficulty() !== 'mixed') {
        url += `&difficulty=${this.difficulty()}`;
      }

      if (this.categoryCode() !== 0) {
        url += `&category=${this.categoryCode()}`;
      }

      const categoryOption = this.categoryOptions.find(
        (option) => option.id === Number(this.categoryCode())
      );
      this.category = categoryOption!['name'];

      this.triggerQuestions.emit({
        url: url,
        questionCount: this.questionCount(),
        difficulty: this.difficulty(),
        categoryCode: this.categoryCode(),
        category: this.category,
      });
    }
  }
}
