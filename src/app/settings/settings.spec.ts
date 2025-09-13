import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Settings } from './settings';

describe('Settings', () => {
  let component: Settings;
  let fixture: ComponentFixture<Settings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Settings],
    }).compileComponents();

    fixture = TestBed.createComponent(Settings);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('questionCount', 15);
    fixture.componentRef.setInput('categoryCode', 0);
    fixture.componentRef.setInput('difficulty', 'mixed');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise default instance variables', () => {
    expect(component.difficulty()).toBe('mixed');
    expect(component.questionCount()).toBe(15);
    expect(component.categoryCode()).toBe(0);
  });

  it('should display a validation message', () => {
    const input = fixture.nativeElement.querySelector('#question-count') as HTMLInputElement;

    input.value = '9';
    component.validateQuestionCount();
    expect(component.validationMessage).toBe('Value must be greater than or equal to 10.');

    input.value = '51';
    component.validateQuestionCount();
    expect(component.validationMessage).toBe('Value must be less than or equal to 50.');

    input.value = '50';
    component.validateQuestionCount();
    expect(component.validationMessage).toBeFalsy();
  });

  it('should randomise setting variables', () => {
    const oldCategoryCode = component.categoryCode();
    const oldDifficulty = component.difficulty();
    const oldQuestionCount = component.questionCount();

    const randomiseButton = fixture.nativeElement.querySelector('#randomise');
    randomiseButton.dispatchEvent(new Event('click'));

    const newCategoryCode = component.categoryCode();
    const newDifficulty = component.difficulty();
    const newQuestionCount = component.questionCount();

    expect(newCategoryCode).not.toBe(oldCategoryCode);
    expect(newDifficulty).not.toBe(oldDifficulty);
    expect(newQuestionCount).not.toBe(oldQuestionCount);
  });

  it('should disable the start button', () => {
    const input = fixture.nativeElement.querySelector('#question-count') as HTMLInputElement;
    const startButton = fixture.nativeElement.querySelector('#start');

    input.value = '9';
    component.validateQuestionCount();
    expect(startButton?.classList.contains('disabled')).toBeTrue();

    input.value = '10';
    component.validateQuestionCount();
    expect(startButton?.classList.contains('disabled')).toBeFalse();

    input.value = '51';
    component.validateQuestionCount();
    expect(startButton?.classList.contains('disabled')).toBeTrue();

    input.value = '50';
    component.validateQuestionCount();
    expect(startButton?.classList.contains('disabled')).toBeFalse();
  });

  it('should trigger the question card', () => {
    const spy = spyOn(component.triggerQuestions, 'emit');

    component.constructApiUrl();
    expect(spy).toHaveBeenCalledWith({
      url: 'https://opentdb.com/api.php?type=multiple&amount=15',
      questionCount: 15,
      difficulty: 'mixed',
      categoryCode: 0,
      category: 'Any Category',
    });

    fixture.componentRef.setInput('categoryCode', 21);
    fixture.componentRef.setInput('difficulty', 'easy');
    fixture.componentRef.setInput('questionCount', 28);
    component.constructApiUrl();
    expect(spy).toHaveBeenCalledWith({
      url: 'https://opentdb.com/api.php?type=multiple&amount=28&difficulty=easy&category=21',
      questionCount: 28,
      difficulty: 'easy',
      categoryCode: 21,
      category: 'Sports',
    });
  });

  it('should validate the question count', () => {
    const spy = spyOn(component.triggerQuestions, 'emit');

    fixture.componentRef.setInput('questionCount', 9);
    component.constructApiUrl();
    expect(spy).toHaveBeenCalledTimes(0);

    fixture.componentRef.setInput('questionCount', 10);
    component.constructApiUrl();
    expect(spy).toHaveBeenCalledTimes(1);

    fixture.componentRef.setInput('questionCount', 51);
    component.constructApiUrl();
    expect(spy).toHaveBeenCalledTimes(1);

    fixture.componentRef.setInput('questionCount', 50);
    component.constructApiUrl();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
