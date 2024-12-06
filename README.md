# Angular E-commerce Application

A responsive and user-friendly e-commerce application built using Angular, featuring product search, filtering, sorting, and navigation. Below are the details and steps to get started with the project.

---

## Features

- **Product Listing**: View products with images, descriptions, and prices.
- **Search Functionality**: Search products by ID, SKU, or name.
- **Category Filter**: Filter products by categories.
- **Sorting Options**: Sort products by price (ascending/descending).
- **Product Details Page**: View detailed information about a selected product.
- **Image Carousel**: Navigate through multiple images for each product.

---

## Screenshots

### Product List Page
![Product List Page](src\assets\image.png)

### Product Details Page
![Product Details Page](src\assets\image1.png)

---

## Prerequisites

Before running this project, ensure the following are installed:

- **Node.js** (v16.x or later): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Angular CLI**: Install globally using:
  ```bash
  npm install -g @angular/cli
Getting Started
1. Install Dependencies
Install the necessary packages:

bash
Copy code
npm install
2. Set Up Environment Variables
Update the src/environments/environment.ts file to configure the API base URL.

Example:

typescript
Copy code
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api/v1', // Replace with your API URL
};
3. Run the Application
Start the development server:

bash
Copy code
ng serve
The application will be accessible at http://localhost:4200.

Development Commands
Run Tests
Execute unit tests:

bash
Copy code
ng test
Build for Production
Generate a production-ready build:

bash
Copy code
ng build --prod
