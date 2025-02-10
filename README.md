# 🌤 WeatherApp

A modern weather application built with **Angular 19**, **Angular Material**, and **RxJS**.

🔗 Live Demo: [WeatherApp](https://weather-app-1-j38z.onrender.com/)

## 🚀 Features
- Search for cities and get real-time weather data
- View **current weather** and **5-day forecast**
- Save favorite cities with **local storage persistence**
- Light and dark mode toggle
- Multi-language support (if implemented)

---

## 🛠 Setup & Installation

### Prerequisites
Ensure you have **Node.js (LTS)** installed. Then, install Angular CLI:
```sh
npm install -g @angular/cli
```

### Install Dependencies
Run the following command in the project root:
```sh
npm install
```

---

## 🎯 Development

### Start the Development Server
```sh
npm start
```
Navigate to [http://localhost:4200](http://localhost:4200).  
The app will reload automatically on file changes.

### Code Scaffolding
To generate a component, directive, or service, use:
```sh
ng generate component component-name
ng generate service service-name
```

---

## 🔨 Building the Project
To build the project for production:
```sh
npm run build
```
Build artifacts will be stored in the `dist/` directory.

To continuously watch for changes and rebuild:
```sh
npm run watch
```

---

## ✅ Testing

### Run Unit Tests
Execute unit tests with Karma:
```sh
npm run test
```

---

## 📦 Project Structure
```
weather-app/
│── src/
│   ├── app/
│   │   ├── components/   # Reusable UI components
│   │   ├── services/     # API calls, caching, and state management
│   │   ├── shared/       # Interfaces, enums, and utilities
│   │   ├── app.module.ts # Main Angular module
│   ├── assets/           # Static assets (icons, styles, etc.)
│   ├── environments/     # Environment variables
│   ├── styles.scss       # Global styles
│   ├── main.ts           # Application entry point
│── angular.json          # Angular CLI configuration
│── package.json          # Dependencies and scripts
│── tsconfig.json         # TypeScript configuration
```

---

## 📜 Environment Variables
This app requires an **OpenWeather API key**.  
Create an `environment.ts` file inside `src/environments/` and add:

```typescript
export const environment = {
  production: false,
  openWeatherKey: 'your-api-key-here'
};
```

For production, update `environment.prod.ts` accordingly.

---

## 📜 License
This project is licensed under the MIT License.

---

### 📩 Need Help?
- Check the [Angular CLI Docs](https://angular.io/cli)
- Reach out via GitHub Issues

Happy Coding! 🎉

---

This `README.md` is now **clean, structured, and informative**, providing clear instructions for setting up, running, and contributing to the project. 🚀
