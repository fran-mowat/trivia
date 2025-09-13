import { Component, inject, input, OnInit, output } from '@angular/core';
import { AnswerOption } from '../answer-option/answer-option';
import { CommonModule } from '@angular/common';
import { Question } from '../interfaces/question';
import { QuestionService } from '../services/question.service';
import { QuestionAnswerDetails } from '../interfaces/questionAnswerDetails';

@Component({
  selector: 'app-question-card',
  imports: [AnswerOption, CommonModule],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss',
})
export class QuestionCard implements OnInit {
  apiUrl = input.required<string>();
  questionCount = input<number>();

  questionValue = '';
  answerValues: string[] = [];
  answerStates: ('correct' | 'incorrect' | 'disabled' | 'notSelected' | '')[] =
    ['disabled', 'disabled', 'disabled', 'disabled'];
  correctAnswerIndex = -1;
  questions: Question[] = [];
  token = '';

  answerSelected = false;
  score = 0;
  questionNumber = 1;
  state: 'ready' | 'answered' = 'ready';
  questionSummaries: QuestionAnswerDetails[] = [];

  questionService = inject(QuestionService);

  triggerSummary = output<{score: number, questionSummaries: QuestionAnswerDetails[]}>();

  ngOnInit() {
    this.questionService.getToken().subscribe((response) => {
      this.token = response.token;
      this.questionService
        .getQuestions(this.apiUrl(), this.token)
        .subscribe((response) => {
          this.questions = response.results;
          this.setQuestion();
          this.answerStates = ['', '', '', ''];
        });
    });
  }

  setQuestion() {
    const nextQuestion = this.questions[this.questionNumber - 1];
    this.questionValue = this.decodeHTML(nextQuestion['question']);

    const answers = nextQuestion['incorrect_answers'];
    this.correctAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(this.correctAnswerIndex, 0, nextQuestion['correct_answer']);

    answers.forEach((answer, i) => {
      answers[i] = this.decodeHTML(answer);
    });

    this.answerValues = answers;
  }

  decodeHTML(encodedValue: string): string {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(encodedValue, 'text/html')
      .documentElement.textContent;
    return decodedString!;
  }

  selectAnswer(answerNumber: number): void {
    if (!this.answerSelected) {
      this.answerSelected = true;
      this.state = 'answered';

      for (let i = 0; i < 4; i++) {
        if (i === answerNumber && i === this.correctAnswerIndex) {
          this.answerStates[i] = 'correct';
          this.score++;
        } else if (i === answerNumber && i !== this.correctAnswerIndex) {
          this.answerStates[i] = 'incorrect';
        } else if (i === this.correctAnswerIndex) {
          this.answerStates[i] = 'notSelected';
        } else {
          this.answerStates[i] = 'disabled';
        }
      }

      const questionDetails = {
        questionValue: this.questionValue, 
        correctAnswer: this.answerValues[this.correctAnswerIndex], 
        selectedAnswer: this.answerValues[answerNumber]
      };

      this.questionSummaries.push(questionDetails);
    }
  }

  changeQuestion(): void {
    this.state = 'ready';
    this.questionNumber++;
    this.setQuestion();
    this.answerSelected = false;
    this.answerStates = ['', '', '', ''];

    const options = document.getElementsByTagName('app-answer-option');
    Array.from(options).forEach((answerOption) => {
      const answerValue = answerOption.firstChild as HTMLElement;
      answerValue.classList = '';
    });
  }
}
