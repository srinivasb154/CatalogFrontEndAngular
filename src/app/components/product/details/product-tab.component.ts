import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductStateService } from '../../../services/product-state.service';

@Component({
  standalone: true,
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.css'],
  imports: [CommonModule, RouterModule],
})
export class ProductTabComponent implements OnInit {
  product: any;
  activeTab: string = 'description';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productStateService: ProductStateService
  ) {}

  ngOnInit(): void {
    this.product = this.productStateService.getProduct();

    if (!this.product) {
      console.error('No product details found in service');
      this.router.navigate(['/products/search']);
    }
  }

  switchTab(tabName: string): void {
    this.activeTab = tabName;
  }

  goBack(): void {
    this.router.navigate(['/products/search']);
  }
}
