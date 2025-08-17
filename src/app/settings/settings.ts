import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  questionCount: number = 15; 
  category: string = "any";
  difficulty: string = "mixed";
} 
