import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../services/brand.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css'],
  imports: [CommonModule, RouterModule],
})
export class BrandDetailsComponent implements OnInit {
  brand: any;

  constructor(private route: ActivatedRoute, private router: Router, private brandService: BrandService) {}

  ngOnInit(): void {
    const brandId = this.route.snapshot.paramMap.get('id');
    if (brandId) {
      this.brandService.getBrandById(brandId).subscribe(
        (data) => {
          this.brand = data;
        },
        (error) => {
          console.error('Error fetching brand details:', error);
        }
      );
    }
  }

  onBack(): void {
    this.router.navigate(['/brands/search']);
  }
}
