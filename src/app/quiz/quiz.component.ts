import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "../shared/services/quiz.service";
import { CategoryService } from "../shared/services/category.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName: string = '';
  categoryId: number = 0;
  categoryName: string = '';

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      console.log(params['categoryId']);
      this.categoryService.getQuizContentByCategory(this.categoryId);
      this.categoryName = this.quizService.getCategoryName(this.categoryId);
    });
  }

  goToResultPage(): void {
    this.router.navigate(['/result']);
  }
}
