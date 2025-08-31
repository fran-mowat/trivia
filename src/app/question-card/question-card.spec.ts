import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCard } from './question-card';
import { QuestionService } from '../services/question.service';
import { MockQuestionService } from '../services/mockQuestionService';

describe('QuestionCard', () => {
  let component: QuestionCard;
  let fixture: ComponentFixture<QuestionCard>;
  let service: QuestionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionCard], 
      providers: [{ provide: QuestionService, useClass: MockQuestionService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionCard);
    component = fixture.componentInstance;
    service = TestBed.inject(QuestionService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve an API token', () => {
    expect(component.token).toBe("token");
  });

  it('should retrieve questions from the API and initialise the first question', () => {
    expect(component.questions.length).toBe(2);

    expect(component.questionValue).toBe('question 1');
    expect(component.answerValues.length).toBe(4);
    expect([0, 1, 2, 3].includes(component.correctAnswerIndex)).toBeTrue();
  });

  it('should decode HTML', () => {
    let decodedString = component.decodeHTML("&quot;&#39;&amp;&lt;&gt;");
    expect(decodedString).toBe('"\'&<>');
  });

  it('should mark correctly selected answers correctly', () => {
    const answerOptions = fixture.nativeElement.querySelectorAll('app-answer-option'); 
    answerOptions[component.correctAnswerIndex].dispatchEvent(new Event('click'));

    for (let i = 0; i < 4; i++){
      if (i === component.correctAnswerIndex){
        expect(component.answerStates[i]).toBe('correct');
      } else {
        expect(component.answerStates[i]).toBe('disabled');
      }
    };

    expect(component.score).toBe(1);
    expect(component.state).toBe('answered');
  });

  it('should mark incorrectly select answer correctly', () => {
    const answerOptions = fixture.nativeElement.querySelectorAll('app-answer-option'); 
      
    const answerIndex = component.correctAnswerIndex ? 0 : 1;
    answerOptions[answerIndex].dispatchEvent(new Event('click'));

    for (let i = 0; i < 4; i++){
      if (i === component.correctAnswerIndex){
        expect(component.answerStates[i]).toBe('notSelected');
      } else if (i === answerIndex){
        expect(component.answerStates[i]).toBe('incorrect');
      } else {
        expect(component.answerStates[i]).toBe('disabled');
      }
    };

    expect(component.score).toBe(0);
    expect(component.state).toBe('answered');
  });

  it('should switch to the next question', () => {
    expect(component.questionValue).toBe('question 1');
    expect(component.answerValues[component.correctAnswerIndex]).toBe('A');
    expect(component.questionNumber).toBe(1);

    component.state = 'answered';
    fixture.detectChanges();

    const nextButton = fixture.nativeElement.querySelector('input');
    nextButton.dispatchEvent(new Event('click'));

    expect(component.questionValue).toBe('question 2');
    expect(component.answerValues[component.correctAnswerIndex]).toBe('B');
    expect(component.questionNumber).toBe(2);
    expect(component.state).toBe('ready');
  });

  it('should trigger the summary card', () => {
    const spy = spyOn(component.triggerSummary, 'emit');

    component.questionCount = 15; 
    component.questionNumber = 15; 
    component.state = 'answered';
    fixture.detectChanges();

    const finishButton = fixture.nativeElement.querySelector('input');
    finishButton.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
  });
});
