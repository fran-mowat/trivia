import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the settings card', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('app-settings')).toBeTruthy();
    expect(compiled.querySelector('app-question-card')).toBeFalsy();
    expect(compiled.querySelector('app-summary-card')).toBeFalsy();
  });

  it('should render the question card', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    
    fixture.componentInstance.screenMode = "questions";
    fixture.detectChanges();

    expect(compiled.querySelector('app-settings')).toBeFalsy();
    expect(compiled.querySelector('app-question-card')).toBeTruthy();
    expect(compiled.querySelector('app-summary-card')).toBeFalsy();
  });

  it('should render the summary card', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    
    fixture.componentInstance.screenMode = "review";
    fixture.detectChanges();

    expect(compiled.querySelector('app-settings')).toBeFalsy();
    expect(compiled.querySelector('app-question-card')).toBeFalsy();
    expect(compiled.querySelector('app-summary-card')).toBeTruthy();
  });
});
