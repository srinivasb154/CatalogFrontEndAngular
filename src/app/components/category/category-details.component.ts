import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  standalone: true,
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
  imports: [CommonModule, RouterModule],
})
export class CategoryDetailsComponent implements OnInit {
  category: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.categoryService.getCategoryById(categoryId).subscribe(
        (data) => {
          this.category = data;
        },
        (error) => {
          console.error('Error fetching category details:', error);
        }
      );
    } else {
      console.warn('No category ID found in the route');
    }
  }

  onBack(): void {
    this.router.navigate(['/categories']);
  }
}
