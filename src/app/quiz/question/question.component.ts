import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  quizContent: any[] = this.categoryService.quizContent;
  categoryId: number = 0;

  constructor(private quizService: QuizService, private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(+params['categoryId']);

      this.categoryService.categoryId = +params['categoryId']; 
      this.categoryId = +params['categoryId']; 
      this.categoryService.getQuizContentByCategory(+params['categoryId']);  
    });
  }
}
