# Placement Hub Codebase Standards & Roadmap

This document defines the coding standards, patterns, and implementation roadmap for the AI Placement Hub project. All agents and developers working on this codebase must adhere to these guidelines.

---

## 1. Tech Stack & Versioning

| Tool | Version | Purpose / Selection Criteria |
|---|---|---|
| Node.js | v20 LTS / v22 LTS | Runtime Stability |
| React | 18.x | Stable UI foundation, concurrent features |
| Vite | 5.x / 6.x | Fast bundler, HMR |
| Redux Toolkit | 2.x | Built-in RTK Query for server state |
| React Router | 6.x | Nested routing and layout wrappers |
| Tailwind CSS | 4.x (Vite plugin) | Utility-first styling (configured via index.css) |
| PropTypes | latest | Runtime type verification (mandatory JS type checking) |

Ensure `package-lock.json` is committed, and caret ranges (`^`) are managed carefully to avoid dependency drift.

---

## 2. JavaScript Code Quality Standards

Since this project uses **pure JavaScript (not TypeScript)**, the following mechanisms are strictly required for code safety and readability:

1.  **Mandatory PropTypes**:
    *   Every UI component must explicitly define `propTypes` for all incoming arguments.
    *   Example:
        ```javascript
        import PropTypes from 'prop-types';

        function UserCard({ name, cgpa }) {
          return (
            <div>
              <h3>{name}</h3>
              <p>CGPA: {cgpa}</p>
            </div>
          );
        }

        UserCard.propTypes = {
          name: PropTypes.string.isRequired,
          cgpa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        };
        ```

2.  **JSDoc Annotations**:
    *   Write brief JSDoc blocks above functions, custom hooks, and utility modules to enable autocomplete and inline IDE suggestions.
    *   Example:
        ```javascript
        /**
         * Toggles the active theme between light and dark mode.
         * @param {string} currentTheme - The active theme state.
         * @returns {void}
         */
        const handleThemeChange = (currentTheme) => { ... };
        ```

3.  **Naming Conventions**:
    *   **UI Components / Layouts**: `PascalCase.jsx` (e.g., `StudentDashboard.jsx`, `AuthLayout.jsx`)
    *   **Custom React Hooks**: `useCamelCase.js` (e.g., `useTheme.js`, `useAuth.js`)
    *   **Utilities / Helper Files**: `camelCase.js` (e.g., `dateFormatter.js`)
    *   **Constants**: `UPPER_SNAKE_CASE.js` (e.g., `API_STATUS.js`)

4.  **ESLint Configuration**:
    *   Strict rules must be configured in `eslint.config.js` including `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-import`.

---

## 3. Directory & Component Architecture

*   **Atomic Structure**: Organize frontend source code:
    *   `src/components/common/` - Global reusable elements (buttons, inputs, cards).
    *   `src/components/layout/` - Header, Sidebar, Navigation wrappers.
    *   `src/layouts/` - Role-based layout templates.
    *   `src/pages/` - Individual page views.
*   **Single Responsibility**: Keep components focused. If a file grows beyond 200 lines, extract logical units into smaller sub-components.
*   **Accessibility (a11y)**: Use semantic HTML layout tags (`<header>`, `<main>`, `<nav>`, `<aside>`) and provide `alt` values for graphics.

---

## 4. State Management & API Integration

*   **Server State**: Managed exclusively through **Redux Toolkit + RTK Query** (for api requests, caching, and invalidation).
*   **Client/UI State**: Use local `useState` for local UI behaviors (e.g., toggling a modal, collapsing a sidebar).
*   **Avoid Prop Drilling**: If a piece of state needs to travel 2+ levels deep, lift it into a Redux slice or a React Context provider (like `ThemeContext`).
*   **Response Validation**: Do not blindly trust API responses. Use `zod` or `yup` schemas to validate structures for forms and critical backend payloads at runtime.

---

## 5. Routing, Authentication, & Dashboards

*   **Protected Routes**: Wrap private views inside `ProtectedRoute` or `RoleBasedRoute` wrappers.
*   **Code-Splitting**: Use `React.lazy` and `Suspense` to split dashboards (Student, Recruiter, Admin) into dedicated bundle chunks.
*   **Custom Error Layouts**: Redirect users to `NotFound` or `Unauthorized` pages where appropriate.

---

## 6. Environment & Configuration

*   Separate configuration settings: `.env` (local defaults), `.env.development`, and `.env.production`.
*   Maintain a public `.env.example` in both client and server roots.
*   Always load API endpoints and socket connections dynamically via `import.meta.env`.
