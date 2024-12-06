import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoggerService } from '../../services/LoggerService';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule, MatToolbarModule, MatIconModule
  ],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  currentImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.fetchProduct();
  }

  fetchProduct(): void {
    try {
      const productId = +this.route.snapshot.paramMap.get('id')!;
      this.productService.getProducts().subscribe(
        (products) => {
          this.product = products.find((prod) => prod.id === productId);
          if (!this.product) {
            throw new Error('Product not found');
          }
        },
        (error) => {
          this.logger.error('Error fetching products', error);
          alert('Failed to load product details. Please try again later.');
        }
      );
    } catch (error) {
      this.logger.error('Error initializing product detail', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  }

  prevImage(): void {
    if (this.product) {
      this.currentImageIndex = (this.currentImageIndex > 0)
        ? this.currentImageIndex - 1
        : this.product.images.length - 1;
    }
  }

  nextImage(): void {
    if (this.product) {
      this.currentImageIndex = (this.currentImageIndex < this.product.images.length - 1)
        ? this.currentImageIndex + 1
        : 0;
    }
  }
}
