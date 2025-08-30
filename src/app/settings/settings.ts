import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  @Input() questionCount!: number; 
  @Input() categoryCode!: number;
  @Input() difficulty!: string;
  category = ""; 
  validationMessage = "";

  categoryOptions = [
    {id: 0, name: "Any Category"}, 
    {id: 9, name: "General Knowledge"},     
    {id: 21, name: "Sports"}, 
    {id: 22, name: "Geography"}, 
    {id: 23, name: "History"}, 
    {id: 17, name: "Science & Nature"}, 
    {id: 18, name: "Computers"}, 
    {id: 19, name: "Mathematics"}, 
    {id: 24, name: "Politics"}, 
    {id: 20, name: "Mythology"}, 
    {id: 27, name: "Animals"}, 
    {id: 25, name: "Art"} 
  ];

  @Output() triggerQuestions = new EventEmitter<{ url: string, questionCount: number, difficulty: string, categoryCode: number, category: string }>(); 

  ngOnInit() {
    if (!this.difficulty){
      this.difficulty = "mixed";
    }

    if (!this.questionCount){
      this.questionCount = 15;
    }

    if (!this.categoryCode){
      this.categoryCode = 0; 
    }
  };

  validateQuestionCount(){
    let input = document.getElementById("question-count") as HTMLInputElement;
    this.validationMessage = input.validationMessage; 

    let startButton = document.getElementById("start");
    this.validationMessage ? startButton?.classList.add("disabled") : startButton?.classList.remove("disabled");
  };

  constructApiUrl(){
    if (this.questionCount >= 10 && this.questionCount <= 50){
      let url = `https://opentdb.com/api.php?type=multiple&amount=${this.questionCount}`;

      if (this.difficulty !== "mixed"){
        url += `&difficulty=${this.difficulty}`;
      }

      if (this.categoryCode !== 0){
        url += `&category=${this.categoryCode}`;
      }

      let categoryOption = this.categoryOptions.find((option) => option.id === Number(this.categoryCode));
      this.category = categoryOption!["name"];

      this.triggerQuestions.emit({ url: url, questionCount: this.questionCount, difficulty: this.difficulty, categoryCode: this.categoryCode, category: this.category});
    }
  };
};
