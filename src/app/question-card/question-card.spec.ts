import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCard } from './question-card';

describe('QuestionCard', () => {
  let component: QuestionCard;
  let fixture: ComponentFixture<QuestionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionCard);
    component = fixture.componentInstance;

    const mockQuestion1 = {question: 'question 1', correct_answer: 'A', incorrect_answers: ['B', 'C', 'D'], category: '', difficulty: '', type: ''};
    const mockQuestion2 = {question: 'question 2', correct_answer: 'B', incorrect_answers: ['A', 'C', 'D'], category: '', difficulty: '', type: ''};
    component.questions = [mockQuestion1, mockQuestion2];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve an API token', async () => {
    expect(component.token).toBeFalsy();

    return component.getToken().then(() => {
      expect(component.token).toBeTruthy();
    });
  });

  it('should decode HTML', () => {
    let decodedString = component.decodeHTML("&quot;&#39;&amp;&lt;&gt;");
    expect(decodedString).toBe('"\'&<>');
  });

  it('should mark correctly selected answers correctly', () => {
    component.setQuestion();
    fixture.detectChanges();

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
    component.setQuestion();
    fixture.detectChanges();

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
    component.state = 'answered';
    component.setQuestion();
    fixture.detectChanges();

    expect(component.questionValue).toBe('question 1');
    expect(component.answerValues[component.correctAnswerIndex]).toBe('A');
    expect(component.questionNumber).toBe(1);

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
