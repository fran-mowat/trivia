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
  categoryCode: number = 0;
  @Input() difficulty!: string;

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

  @Output() triggerQuestions = new EventEmitter<{ url: string, questionCount: number, difficulty: string }>(); 

  ngOnInit() {
    if (!this.difficulty){
      this.difficulty = "mixed";
    }

    if (!this.questionCount){
      this.questionCount = 15;
    }
  }

  constructApiUrl(){
    let url = `https://opentdb.com/api.php?type=multiple&amount=${this.questionCount}`;

    if (this.difficulty !== "mixed"){
      url += `&difficulty=${this.difficulty}`;
    }

    if (this.categoryCode !== 0){
      url += `&category=${this.categoryCode}`;
    }

    this.triggerQuestions.emit({ url: url, questionCount: this.questionCount, difficulty: this.difficulty});
  };
};
