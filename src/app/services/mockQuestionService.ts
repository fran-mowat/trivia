import { of } from "rxjs";

export class MockQuestionService{
  getToken(){
    return of({response_code: 0, response_message: "response_message", token: "token"});
  }

  getQuestions(apiUrl: string, token: string){
    const mockQuestion1 = {question: 'question 1', correct_answer: 'A', incorrect_answers: ['B', 'C', 'D'], category: '', difficulty: '', type: ''};
    const mockQuestion2 = {question: 'question 2', correct_answer: 'B', incorrect_answers: ['A', 'C', 'D'], category: '', difficulty: '', type: ''};
    return of({response_code: 0, results: [mockQuestion1, mockQuestion2]});
  }
};