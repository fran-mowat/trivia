import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { SummaryCard } from './summary-card';

describe('SummaryCard', () => {
  let component: SummaryCard;
  let fixture: ComponentFixture<SummaryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('category', 'Mathematics');
    fixture.componentRef.setInput('difficulty', 'mixed');
    fixture.componentRef.setInput('score', 0);
    fixture.componentRef.setInput('questionCount', 15);
    fixture.componentRef.setInput('questionSummaries', []);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display quiz settings', () => {
    fixture.componentRef.setInput('category', 'Mathematics');
    fixture.componentRef.setInput('difficulty', 'mixed');
    fixture.detectChanges();
    const categoryDisplay = fixture.nativeElement.querySelectorAll('span')[0];
    const difficultyDisplay = fixture.nativeElement.querySelectorAll('span')[1];

    expect(categoryDisplay.innerHTML).toBe('mathematics');
    expect(difficultyDisplay.innerHTML).toBe('mixed');

    fixture.componentRef.setInput('category', 'Politics');
    fixture.componentRef.setInput('difficulty', 'hard');
    fixture.detectChanges();

    expect(categoryDisplay.innerHTML).toBe('politics');
    expect(difficultyDisplay.innerHTML).toBe('hard');
  });

  it('should display scores of 0 instantly', () => {
    const scoreDisplay = fixture.nativeElement.querySelector('.score');

    fixture.componentRef.setInput('questionCount', 15);
    fixture.componentRef.setInput('score', 0);
    fixture.detectChanges();

    expect(scoreDisplay.innerHTML).toBe('0/15');
  });

  it('should should display scores greater than 0', fakeAsync(() => {
    const scoreDisplay = fixture.nativeElement.querySelector('.score');

    fixture.componentRef.setInput('questionCount', 10);
    fixture.componentRef.setInput('score', 3);
    fixture.detectChanges();

    expect(scoreDisplay.innerHTML).toBe('');

    tick(3000);

    expect(scoreDisplay.innerHTML).toBe('3/10');
  }));

  it('should move the progress bar', fakeAsync(() => {
    const setPropertySpy = spyOn(document.documentElement.style, 'setProperty');

    fixture.componentRef.setInput('questionCount', 10);
    fixture.componentRef.setInput('score', 5);
    fixture.detectChanges();

    expect(setPropertySpy).not.toHaveBeenCalled();

    tick(2000);

    expect(setPropertySpy).toHaveBeenCalled();
  }));

  it('should move the progress bar to 100%', fakeAsync(() => {
    const setPropertySpy = spyOn(document.documentElement.style, 'setProperty');

    fixture.componentRef.setInput('questionCount', 10);
    fixture.componentRef.setInput('score', 10);
    fixture.detectChanges();

    expect(setPropertySpy).not.toHaveBeenCalled();

    tick(2000);

    expect(setPropertySpy).toHaveBeenCalled();
  }));

  it('should play again', () => {
    const spy = spyOn(component.playAgain, 'emit');

    const button = fixture.nativeElement.querySelector('input');
    button.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
  });

  it('should switch view', () => {
    expect(component.showQuestions).toBeFalse();
    expect(component.switchedView).toBeFalse();
    expect(component.percentageDisplay).toBeFalsy();
    expect(component.scoreDisplay).toBeFalsy();

    component.switchView();

    expect(component.showQuestions).toBeTrue();
    expect(component.switchedView).toBeTrue();
    expect(component.percentageDisplay).toBeFalsy();
    expect(component.scoreDisplay).toBeFalsy();

    component.switchView();

    expect(component.showQuestions).toBeFalse();
    expect(component.switchedView).toBeTrue();
    expect(component.percentageDisplay).toBeTruthy();
    expect(component.scoreDisplay).toBeTruthy();
  });
});
