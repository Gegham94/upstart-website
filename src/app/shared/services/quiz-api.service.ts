import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api/api-response.interface';
import { environment } from '../../../environments/environment';
import { Question } from '../interfaces/question.interface';
import { Lesson } from '../interfaces/lesson.interface';
import { Quiz } from '../interfaces/quiz.interface';

const API_URL = environment.apiUrl;

@Injectable()
export class QuizApiService {
  constructor(private readonly httpClient: HttpClient) {}

  public createQuestion(
    sectionId: number,
    question: Partial<Question>,
  ): Observable<ApiResponse<Question>> {
    return this.httpClient.post<ApiResponse<Question>>(`${API_URL}quiz/question/create`, {
      section_id: sectionId,
      ...question,
    });
  }

  public updateQuestion(
    questionId: number,
    question: Partial<Question>,
  ): Observable<ApiResponse<Question>> {
    return this.httpClient.post<ApiResponse<Question>>(
      `${API_URL}quiz/question/update/${questionId}`,
      {
        ...question,
      },
    );
  }

  public deleteQuiz(id: number, courseID: number, sectionId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse<Lesson>>(`${API_URL}quiz/delete/${id}`, {
      id,
      course_id: courseID,
      section_id: sectionId,
    });
  }

  public updateQuiz(quiz: Partial<Quiz & { section_id: number }>): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse<Quiz>>(`${API_URL}quiz/update`, quiz);
  }
}
