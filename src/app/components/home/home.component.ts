import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [FormsModule, RouterModule], // Import FormsModule and RouterModule
})
export class HomeComponent {
  searchQuery: string = ''; // Declare the property

  handleSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }

  handleSearchSubmit(): void {
    console.log('Search for:', this.searchQuery);
    // Add functionality to fetch/search products based on the query
  }
}
