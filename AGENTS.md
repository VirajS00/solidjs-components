### Opencode Quick Guide

**Setup & Development**
**Install Dependencies:** The project uses `pnpm` for package management. Run `pnpm install` to set up the environment.
*   **Run Development Server (Storybook):** Use `pnpm run storybook` to start the app. This runs the Storybook development server at `http://localhost:6006`.

**Build & Deployment**
*   **Build for Production (Storybook):** Use `pnpm run build-storybook`. This command builds the Storybook application for static deployment.
*   **Build for Production:** Use `pnpm run build`. This command:
    1.  Bundles the SolidJS application for production.
    2.  Minifies the code.
    3.  Outputs the final optimized files into the `dist` folder.
*   **Deployment:** The contents of the `dist` folder are ready for static deployment (see [Vite documentation](https://vite.dev/guide/static-deploy.html) for details).

**Process Flow**
*   The standard development workflow is `pnpm run dev` for local testing, followed by `npm run build` for production artifacts.