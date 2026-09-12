# SARTHAK • सार्थक
> National Cooperative Skill, Training, ERP & Employment Digital Public Infrastructure
> Smart India Hackathon 2026 Prototype (Problem Statement SIH26087)

---

## Why did you see a blank page when opening on GitHub?

There are two common causes:

1. **GitHub Pages Subpath (Asset 404)**:
   - When hosted on GitHub Pages (`https://<username>.github.io/<repo-name>/`), standard Vite builds use absolute asset paths (`/assets/...`), which look for assets at the root domain (`https://<username>.github.io/assets/...`) and return 404, resulting in a blank white screen.
   - **Fixed**: We configured `base: './'` in `vite.config.ts` so that all scripts and CSS load using relative paths in any subfolder or repository.

2. **Opening the raw `index.html` file directly in a browser**:
   - This is a modern React/Vite TypeScript Single Page Application. Browsers cannot load raw JSX/TSX files or npm packages directly from the repository without running Vite.
   - To view the app locally, follow the quick start instructions below.

---

## Quick Start (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (comes with Node.js)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and go to `http://localhost:3000` (or the port displayed in your terminal).

4. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

---

## Deploy to GitHub Pages

An automated GitHub Actions workflow (`.github/workflows/deploy.yml`) is already configured in this repository.

To enable GitHub Pages:
1. Go to your GitHub repository.
2. Click **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Push any commit to the `main` branch (or run the workflow manually from the **Actions** tab).
5. GitHub will build the application and provide your live link!
