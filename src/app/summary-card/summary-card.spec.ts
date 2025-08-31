import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SummaryCard } from './summary-card';

describe('SummaryCard', () => {
  let component: SummaryCard;
  let fixture: ComponentFixture<SummaryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCard], 
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCard);
    component = fixture.componentInstance;
    component.category = "Mathematics";
    component.difficulty = "mixed";
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display quiz settings', () => {
    fixture.detectChanges();
    const categoryDisplay = fixture.nativeElement.querySelectorAll('span')[0];
    const difficultyDisplay = fixture.nativeElement.querySelectorAll('span')[1];

    expect(categoryDisplay.innerHTML).toBe('mathematics');
    expect(difficultyDisplay.innerHTML).toBe('mixed');

    component.category = "Politics";
    component.difficulty = "hard";
    fixture.detectChanges();

    expect(categoryDisplay.innerHTML).toBe('politics');
    expect(difficultyDisplay.innerHTML).toBe('hard');
  });

  it('should display scores of 0 instantly', () => {
    const scoreDisplay = fixture.nativeElement.querySelector('.score');

    component.questionCount = 15; 
    component.score = 0; 
    fixture.detectChanges();

    expect(scoreDisplay.innerHTML).toBe('0/15');
  });

  it('should should display scores greater than 0', fakeAsync(() => {
    const scoreDisplay = fixture.nativeElement.querySelector('.score');

    component.questionCount = 10; 
    component.score = 3; 
    fixture.detectChanges();

    expect(scoreDisplay.innerHTML).toBe('');

    tick(3000);

    expect(scoreDisplay.innerHTML).toBe('3/10');
  }));

  it('should move the progress bar', fakeAsync(() => {
    const setPropertySpy = spyOn(document.documentElement.style, 'setProperty');

    component.score = 5; 
    component.questionCount = 10; 
    fixture.detectChanges();

    expect(setPropertySpy).not.toHaveBeenCalled();

    tick(2000);

    expect(setPropertySpy).toHaveBeenCalled();
  }));

  it('should move the progress bar to 100%', fakeAsync(() => {
    const setPropertySpy = spyOn(document.documentElement.style, 'setProperty');

    component.score = 10; 
    component.questionCount = 10; 
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
});
