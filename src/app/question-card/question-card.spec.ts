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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve an API token', async () => {
    component.apiUrl = 'https://opentdb.com/api.php?type=multiple&amount=10';

    await component.getToken();
    expect(component.token).toBeTruthy();
  });
});
