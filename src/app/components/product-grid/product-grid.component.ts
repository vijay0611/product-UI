import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';  // Add this import
import { LoggerService } from '../../services/LoggerService';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatGridListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,  // Include MatAutocompleteModule here
  ],
})
export class ProductGridComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string = 'all';
  categories: string[] = [];
  searchTerm: string = '';
  selectedSortOrder: string = 'asc';
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = ['all', ...categories];
        this.logger.log('Categories loaded successfully');
      },
      error: (err) => {
        this.logger.error('Error loading categories', err);
      },
    });
  }

  loadProducts(): void {
    this.productService.getProducts(this.selectedCategory, this.searchTerm, this.selectedSortOrder).subscribe({
      next: (data) => {
        this.products = data ? data : [];
        this.filteredProducts = this.products;
        this.logger.log('Products loaded successfully');
      },
      error: (err) => {
        this.logger.error('Error loading products', err);
      },
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.logger.log(`Category changed to: ${category}`);
    this.loadProducts();
  }

  onSearch(): void {
    this.logger.log(`Search triggered with term: ${this.searchTerm}`);
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.id.toString().includes(this.searchTerm) ||
      product.sku?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.loadProducts();
  }

  onSortChange(direction: string): void {
    this.selectedSortOrder = direction;
    this.logger.log(`Sort order changed to: ${direction}`);
    this.loadProducts();
  }

  currentImageIndex(product: Product): number {
    return product.currentImageIndex || 0;
  }

  prevImage(product: Product): void {
    const totalImages = product.images.length;
    const currentIndex = this.currentImageIndex(product);
    product.currentImageIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    this.logger.log(`Image changed to previous for product ${product.id}`);
  }

  nextImage(product: Product): void {
    const totalImages = product.images.length;
    const currentIndex = this.currentImageIndex(product);
    product.currentImageIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    this.logger.log(`Image changed to next for product ${product.id}`);
  }
}
