import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('QuestionService', () => {
  let questionService: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [QuestionService, provideHttpClient()]});
    questionService = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(questionService).toBeTruthy();
  });

  it('should retrieve a token', (done) => {
    questionService.getToken().subscribe(response => {
      expect(response.response_code).toBe(0);
      expect(response.response_message).toBe('Token Generated Successfully!');
      expect(response.token).toBeTruthy();
      done(); 
    });
  }); 

  it('should retrieve questions', (done) => {
    questionService.getQuestions('https://opentdb.com/api.php?type=multiple&amount=3', '').subscribe(response => {
      expect(response.response_code).toBe(0);
      expect(response.results.length).toBe(3);
      done();
    });
  });
});
