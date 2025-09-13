import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { QuestionService } from './services/question.service';
import { MockQuestionService } from './services/mockQuestionService';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: QuestionService, useClass: MockQuestionService }],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the settings card', () => {
    expect(component.screenMode).toBe('settings');

    expect(fixture.nativeElement.querySelector('app-settings')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('app-question-card')
    ).toBeFalsy();
    expect(fixture.nativeElement.querySelector('app-summary-card')).toBeFalsy();
  });

  it('should render the question card', () => {
    component.startQuestions({
      url: '',
      questionCount: 0,
      difficulty: '',
      categoryCode: 0,
      category: '',
    });
    fixture.detectChanges();

    expect(component.screenMode).toBe('questions');

    expect(fixture.nativeElement.querySelector('app-settings')).toBeFalsy();
    expect(
      fixture.nativeElement.querySelector('app-question-card')
    ).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-summary-card')).toBeFalsy();
  });

  it('should render the summary card', () => {
    component.startSummary({ score: 0, questionSummaries: [] });
    fixture.detectChanges();

    expect(component.screenMode).toBe('review');

    expect(fixture.nativeElement.querySelector('app-settings')).toBeFalsy();
    expect(
      fixture.nativeElement.querySelector('app-question-card')
    ).toBeFalsy();
    expect(
      fixture.nativeElement.querySelector('app-summary-card')
    ).toBeTruthy();
  });
});
