import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class CategoryService {
  quizContent: any[] = [];
  categoryId: number = 0;
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get('http://localhost:3000/categories');
  }

  getQuizContentByCategory(categoryId: number) {
    this.http.get(`http://localhost:3000/questions?categoryId=${categoryId}`).subscribe((questions: any) => {
      for (const question of questions) {
        this.http.get(`http://localhost:3000/answers?questionId=${question.id}`).subscribe((answers: any) => {
          this.quizContent.push({
              id: question.id,
              question: question.questionLabel,
              answers
          });
        });
      }
    });
  }
  
}
