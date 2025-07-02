# Lowkick Calendar – demo

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app). It is designed as a **comprehensive developer showcase** to demonstrate proficiency in full-stack modern web development, with a strong emphasis on scalability, UI/UX best practices, accessibility, and robust architecture.

## Project Goals

This application serves as a **calendar interface for structured course schedules**. It is built to demonstrate expertise in:

- TypeScript with strict typing for data safety
- Component-driven architecture (React + Next.js)
- Smart filtering and stateful logic with `useMemo`, `useState`
- Data visualization and dynamic layouts
- Scalable styling using TailwindCSS
- Accessibility-first design
- UI Systems, atomic design patterns
- End-to-end application development: from frontend to API layer and optional CMS

---

## Tech Stack Overview

| Layer                      | Technology                                                 |
| -------------------------- | ---------------------------------------------------------- |
| Frontend Framework         | **Next.js 14** (App Router)                                |
| Language                   | **TypeScript**                                             |
| Styling                    | **TailwindCSS**, responsive layout                         |
| State Management           | **React hooks**, `useMemo`, `useState`                     |
| Testing (Planned)          | **Jest**, **React Testing Library**                        |
| Backend API (Planned)      | **Node.js**, **Express**, **MongoDB (MIRN stack)**         |
| Alternative CMS (Optional) | **Sanity.io** as a Headless CMS                            |
| Accessibility              | **WCAG 2.1** standards, keyboard navigation, semantic HTML |
| Deployment                 | **Vercel**, optimized for performance                      |

---

## Core Features

### Dynamic Course Filtering System

The calendar allows filtering courses by:

- **Level** (Beginner / Intermediate / Advanced)
- **Title**
- **Trainer**
- **Age Group** (Adults / Youngs)
- **Open To All** (Accessibility-first)

The filtering is implemented with `useMemo` to optimize performance by avoiding unnecessary re-renders.

### Scalable Component Architecture

- Reusable and composable components for `Course`, `Filters`, etc.
- Clear separation of concerns with **Props Drilling** managed cleanly
- Structure ready for **Context API** or **Zustand** if state grows

### Strong Typing with TypeScript

All data interfaces (like `Course[]`) are strictly typed to:

- Reduce runtime bugs
- Enable powerful IDE autocompletion and error detection
- Improve long-term maintainability

> Note: Static typing is asserted but JSON validation (e.g., Zod) can be integrated later for runtime safety.

### Accessibility (a11y) Principles

This project follows **Web Content Accessibility Guidelines (WCAG 2.1)** with:

- Proper use of HTML5 semantic tags
- Keyboard navigable interface
- High-contrast, readable typography
- Clear focus styles
- Meaningful alt texts and ARIA roles (to be fully added)

### UI System & Web Design Principles

- Atomic layout design
- Responsive across mobile / tablet / desktop
- Modern utility-first styling via Tailwind
- Accessible, readable UI with clear hierarchy and spacing
- Room-specific views, weekday breakdown, and dynamic time sorting

---

## Testing (Planned Phase)

A comprehensive test suite will be added using:

- **Jest** for unit testing logic (e.g., filtering function)
- **React Testing Library** for component interaction
- **End-to-End** testing planned with **Playwright** or **Cypress**

The goal is to demonstrate:

- Test-driven development (TDD) habits
- Component and integration tests
- Continuous integration readiness

---

## REST API (Planned)

### Goal:

To replace static JSON with dynamic backend content using a RESTful API built with the **MIRN** stack:

- **MongoDB** for storing course metadata
- **Express.js** as backend framework
- **React / Next.js** frontend
- **Node.js** runtime

### Optional: CMS Integration

A secondary version of the API will use **Sanity.io** as a **Headless CMS**, to demonstrate content-driven architecture.

---

## Upcoming Features

- [ ] Full test coverage (unit + integration)
- [ ] Backend REST API (Node + MongoDB)
- [ ] Form to create/edit course data
- [ ] Sanity CMS backend alternative
- [ ] Enhanced accessibility pass (axe-core integration)
- [ ] Dark mode with `tailwind-dark`
- [ ] Animations via `Framer Motion`

---

## Project Structure

/components
/Calendar
Course.tsx
Filters.tsx
/pages
index.tsx // Calendar UI
/data
data.json // Static seed data (will be dynamic)
/styles
globals.css // TailwindCSS setup
/tests // Jest test files (planned)

---

## 👩🏻‍💻 Author

Built with ❤️ by ROXBOZ, a full-stack web developer with a strong emphasis on clean code, accessible design, and scalable systems. This calendar app serves as a living resume for frontend and backend excellence.

---

## 📜 License

This project is open-source and available under the MIT License.
