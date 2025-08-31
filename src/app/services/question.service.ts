import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private httpClient: HttpClient){ };

  getToken(){
    return this.httpClient.get<{response_code: number, response_message: string, token: string}>('https://opentdb.com/api_token.php?command=request');
  }

  getQuestions(apiUrl:string, token: string){
    return this.httpClient.get<{response_code: number, results: Array<Question>}>(`${apiUrl}&token=${token}`);
  }
}
