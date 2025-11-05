# API Tester - Angular

A modern Angular application for testing external APIs. Built with Angular 17 and standalone components.

## Features

- 🚀 Test any HTTP method (GET, POST, PUT, PATCH, DELETE, OPTIONS)
- 📝 Custom headers support
- 📦 Request body editor for POST/PUT/PATCH requests
- 📊 Beautiful response viewer with syntax highlighting
- ⏱️ Response time tracking
- 📋 View response headers and status codes
- 🎨 Modern, responsive UI
- 🔐 WooCommerce API authentication support
- 🌐 Accessible via ngrok for external testing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- ngrok (for external access)

### Installation

```bash
npm install
```

### Development

#### Local Development

```bash
npm start
```

The app will be available at `http://localhost:4200`

#### Access via ngrok

1. Start the Angular dev server:
   ```bash
   npm start
   ```

2. In a new terminal, start ngrok:
   ```bash
   ngrok http 4200
   ```

3. Use the ngrok URL (e.g., `https://b6d220191a33.ngrok-free.app`) to access your app

**Note:** The Angular dev server is configured to accept connections from any host (`host: 0.0.0.0`), so it will work with ngrok.

## Usage

1. Select an HTTP method from the dropdown
2. Enter your API endpoint URL
3. (Optional) Add custom headers in JSON format
4. (Optional) Add request body for POST/PUT/PATCH requests
5. (Optional) Configure authentication (Basic Auth or Query Parameters)
6. Click "Send" to make the request
7. View the response, status code, and response time

## Example API Endpoints

- GitHub API: `https://api.github.com/users/octocat`
- JSONPlaceholder: `https://jsonplaceholder.typicode.com/posts/1`
- HTTPBin: `https://httpbin.org/get`
- WooCommerce API: `https://your-site.com/wp-json/wc/v3/products`

## Technologies

- Angular 17
- TypeScript
- Angular HttpClient (for native browser requests and CORS preflight visibility)
- Standalone Components
- Modern CSS

## Project Structure

```
src/
├── app/
│   ├── app.component.ts      # Main component logic
│   ├── app.component.html     # Component template
│   └── app.component.css      # Component styles
├── main.ts                    # Application bootstrap
├── index.html                  # HTML entry point
└── styles.css                  # Global styles
```

## CORS Preflight Requests

This app uses Angular's HttpClient, which uses the browser's native fetch API. This means you can see CORS preflight (OPTIONS) requests in your browser's Network tab when making cross-origin requests.

To view preflight requests:
1. Open browser Developer Tools
2. Go to Network tab
3. Enable "Preserve log"
4. Make a request - you'll see the OPTIONS preflight request before your actual request"# test-angular-app" 
"# test-angular-app" 
