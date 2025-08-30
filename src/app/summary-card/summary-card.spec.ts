import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCard } from './summary-card';

describe('SummaryCard', () => {
  let component: SummaryCard;
  let fixture: ComponentFixture<SummaryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCard);
    component = fixture.componentInstance;
    component.category = "Mathematics";
    component.difficulty = "mixed";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display quiz settings', () => {
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

  it('should play again', () => {
    const spy = spyOn(component.playAgain, 'emit');

    const button = fixture.nativeElement.querySelector('input');
    button.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
  });
});
