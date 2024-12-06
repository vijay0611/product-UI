# Angular E-commerce Application

A simple Angular-based e-commerce application for viewing, searching, and filtering products.

## Prerequisites

- **Node.js** (v16.x or later) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Angular CLI**  
  Install Angular CLI globally if not already installed:  
  ```bash
  npm install -g @angular/cli
Getting Started
1. Install dependencies
bash
Copy code
npm install
2. Set up the environment variables
Edit the src/environments/environment.ts file to configure the API base URL.

Example:

typescript
Copy code
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api/v1', // API URL
};
3. Run the application
Start the development server:

bash
Copy code
ng serve
Access the app at http://localhost:4200/.

Development Commands
Run tests:

bash
Copy code
ng test
Build for production:

bash
Copy code
ng build --prod