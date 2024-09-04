import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-categories',  // Assurez-vous d'avoir ce décorateur @Component
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  filteredCategories: any[] = [];
  searchQuery: string = '';

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
      this.filteredCategories = categories;
    });
  }

  onCategorySelected(categoryId: number): void {
    this.router.navigate(['/quiz', categoryId]); 
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  resetFilter(): void {
    this.filteredCategories = this.categories;
    this.searchQuery = '';
  }
}
