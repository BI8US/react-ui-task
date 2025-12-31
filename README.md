# Test Assignment — Multi-page App

This project is a React-based web application developed as a test assignment. It demonstrates modern frontend development practices, including authentication flows, routing, internationalization, and interactive UI components.

## 📋 Task Requirements

The goal was to build a simple multi-page web application using React to demonstrate navigation, UI design, and component structuring.

**Core Requirements:**
* **Pages:** Sign Up, Login, and Index (Home) pages.
* **Navigation:** A Navbar on the Index page with 3 options navigating to different subpages.
* **Routing:** Every subpage must have a "Back" button returning to the Index Page.
* **Authentication UI:** A "Log Out" button that redirects the user back to the Login Page.
* **Tech Stack:** React Router for navigation. No backend required (mock logic).

**Bonus (Implemented):**
* ✅ Unit & Integration tests using Vitest & React Testing Library.

---

## 🚀 Features & Implementation

Instead of simple placeholder pages, I implemented interactive mini-apps to make the experience more engaging.

### Key Features
* **Authentication Flow:**
    * Mock authentication using `sessionStorage` (persists on page reload, clears on browser close).
    * Protected Routes wrapper to prevent unauthorized access.
    * Form validation for Login and Sign Up pages.
* **Interactive Subpages (Mini-Games):**
    * **Coin Flipper:** A 3D animated coin flip decision maker.
    * **Retro Snake:** A fully functional Snake game with score tracking.
    * **Wheel of Fortune:** A customizable spinning wheel to pick random options.
* **Customization:**
    * **Dark/Light Mode:** Theme persistence using local storage and system preference detection.
    * **Internationalization (i18n):** Full support for **English** and **Estonian** languages.

### Tech Stack
* **Framework:** React + Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** React Icons
* **Testing:** Vitest + React Testing Library

---

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/BI8US/react-ui-task.git
    cd react-ui-task
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Run tests:**
    ```bash
    npm test
    ```

---

## 📂 Project Structure

```text
src/
├── __tests__/         # Unit and Integration tests
├── components/        # Reusable UI components (Button, Input, Navbar, etc.)
├── context/           # React Contexts (Auth, Theme, Language)
├── locales/           # Translation files (en.ts, et.ts)
├── pages/             # Page components (Home, Snake, Wheel, Auth pages)
└── App.tsx            # Main routing logic
```

---

## 🧪 Testing
The project includes tests configured with Vitest.

- **Unit Tests:** Validate component rendering and logic (e.g., Button.tsx).

- **Integration Tests:** Verify routing protection and redirects (e.g., ensuring unauthenticated users are redirected to Login).

- **To run tests with UI:**
    ```bash
    npm run test:ui
    ```
