import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  questionCount: number = 15; 
  category: string = "any";
  difficulty: string = "mixed";

  categoryOptions = [
    {id: "any", name: "Any Category"}, 
    {id: "generalKnowledge", name: "General Knowledge"}, 
    {id: "sports", name: "Sports"}, 
    {id: "geography", name: "Geography"}, 
    {id: "history", name: "History"}, 
    {id: "science", name: "Science & Nature"}, 
    {id: "computers", name: "Computers"}, 
    {id: "mathematics", name: "Mathematics"}, 
    {id: "politics", name: "Politics"}, 
    {id: "mythology", name: "Mythology"}, 
    {id: "animals", name: "Animals"}
  ];
};
