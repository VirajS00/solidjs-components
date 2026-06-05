### Opencode Quick Guide

**Setup & Development**
*   **Install Dependencies:** The project uses `npm` for package management. Run `npm install` (or `pnpm install` / `yarn install`) to set up the environment.
*   **Run Development Server:** Use `npm run dev` to start the app. This runs the app in development mode and provides a local preview at `http://localhost:5173`.

**Build & Deployment**
*   **Build for Production:** Use `npm run build`. This command:
    1.  Bundles the SolidJS application for production.
    2.  Minifies the code.
    3.  Outputs the final optimized files into the `dist` folder.
*   **Deployment:** The contents of the `dist` folder are ready for static deployment (see [Vite documentation](https://vite.dev/guide/static-deploy.html) for details).

**Process Flow**
*   The standard development workflow is `npm run dev` for local testing, followed by `npm run build` for production artifacts.