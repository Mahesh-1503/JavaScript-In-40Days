# Module 02: React Project Setup & Bundlers (Vite App Initializer)

Setting up a modern React project requires an understanding of how code is compiled, bundled, and delivered to the browser. Rather than relying on magic scripts, professional engineers must understand the build pipeline—including compilers, bundlers, development servers, Hot Module Replacement (HMR), and the difference between development and production environments.

---

## 1. Mental Model (The Production Pipeline)

Think of a **manufacturing pipeline**:
1. **Raw Materials (Source Code):** You write React code with modern JavaScript (ES6+), JSX syntax, CSS Modules, and static assets. Web browsers cannot execute JSX or resolve custom assets natively.
2. **The Assembly Line (The Compiler/Transpiler):** Tooling like **Babel** or **ESBuild** translates JSX and modern JS into plain, old JavaScript (ES5/ES6) that every web browser understands.
3. **The Packaging Department (The Bundler):** Tools like **Rollup** or **Webpack** take hundreds of separate JS, CSS, and asset files, shake off unused code (tree-shaking), and package them into small, optimized files (bundles) ready for distribution.
4. **The Live Editor (Dev Server & HMR):** In development, we use a local server that watches files for changes. When you modify a file, instead of rebuilding the entire factory and reloading the webpage, the system injects the changed code directly into the browser memory (**Hot Module Replacement**), keeping your app state intact.

---

## 2. Visual Thinking (The Build Pipeline Architecture)

How source files are processed in development (fast ES modules) versus compiled for production distribution:

```
[ DEVELOPMENT WORKFLOW ]
   Source Code (JSX, CSS)
         │
         ▼
   [ Vite Dev Server ] ──(ESBuild: On-Demand Transpilation)──► [ Browser (ESM) ]
         ▲
         └───────(HMR: WebSocket pushes only modified modules)────────┘

[ PRODUCTION BUILD WORKFLOW ]
   Source Code (JSX, CSS)
         │
         ▼
   [ Vite Builder ] ──(Rollup: Tree Shaking & Optimization)──► [ Production Bundles ]
                                                               ├─ dist/index.html
                                                               ├─ dist/assets/index-[hash].js
                                                               └─ dist/assets/index-[hash].css
```

---

## 3. Beginner Explanation

- **Bundler:** A tool that merges multiple JavaScript files and dependencies into one or more single files to improve load performance.
- **Transpiler (Compiler):** A tool (like Babel or ESBuild) that converts code written in one language/syntax (like JSX or TypeScript) into standard JavaScript.
- **Vite:** A modern frontend build tool that is incredibly fast. It leverages native browser ES Modules (ESM) in development and bundles with Rollup for production.
- **Hot Module Replacement (HMR):** A feature that allows code updates to be pushed to the browser in real time without refreshing the page or losing current state.
- **Dependencies vs. devDependencies:**
  - **dependencies:** Libraries required to run the app in production (e.g., `react`, `react-dom`).
  - **devDependencies:** Tools required only during development and building (e.g., `vite`, `eslint`).

---

## 3.5. Syntax & Basic Code Mechanics

Before configuring complex environment variables and API proxies, let's understand the files created inside a default Vite + React project.

### 1. The Project Directory Tree
Here is what a clean, newly created project looks like:
```
my-react-app/
├── index.html          # The entry point HTML file containing a mounting target <div id="root">
├── package.json        # The project dashboard (scripts, dependencies, metadata)
├── vite.config.js      # Vite build configurations and plugin registrations
└── src/                # Source folder (where 99% of your code is written)
    ├── main.jsx        # The javascript entry point. Connects React to index.html's root div
    ├── App.jsx         # The main root React component
    └── index.css       # Global styling rules
```

### 2. The Configuration Files

#### `package.json` (Simplest Template)
This file defines metadata, command shortcuts (scripts), and packages to install.
```json
{
  "name": "my-react-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^6.0.0"
  }
}
```

#### `vite.config.js` (Simplest Template)
This configuration loads Vite settings and instructs it to use the React plugin.
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

### Line-by-Line Breakdown for Beginners

1. **`"dev": "vite"`** (inside `package.json`)
   - The key-value shortcut for starting our local development server. In terminal, running `npm run dev` starts Vite, compiling code on the fly.
2. **`"dependencies": { "react": ... }`**
   - Libraries that the browser will download and execute in production when visiting the live site.
3. **`"devDependencies": { "vite": ... }`**
   - Build-time packages. These tools run on your local computer to compile, clean, and build files. They are excluded from production builds.
4. **`plugins: [react()]`** (inside `vite.config.js`)
   - Binds the official React plugin to Vite. This plugin configures Babel/ESBuild to read and compile JSX code tags automatically.

---

## 4. Deep Explanation (Vite Internals, ESBuild, & HMR)

### 1. Vite vs. Legacy Bundlers (Webpack)
Legacy bundlers had to build the *entire* application bundle before starting the development server. As the codebase grew, startup times escalated to minutes.
Vite solves this by dividing application modules into **dependencies** and **source code**:
- **Dependencies:** Pre-bundled once using **ESBuild** (written in Go, performing 10-100x faster than JS-based bundlers).
- **Source Code:** Served directly via native browser ES Modules (`import`/`export` syntax). The browser requests specific files only as they are loaded on screen, avoiding upfront bundling.

### 2. Hot Module Replacement (HMR) Mechanics
When a file is saved:
1. Vite's file watcher detects the change.
2. An HMR exchange occurs over a WebSocket connection between Vite's dev server and the browser client.
3. The browser dynamically imports the updated module.
4. React's fast-refresh runtime swaps the old component definition with the new one in memory without unmounting other components, preserving the component state.

### 3. Production Compilation Split
For production builds, Vite switches to **Rollup** for bundling:
- Generates cache-busted filenames (e.g., `index-a8d29c1.js`) for static caching.
- Employs **Tree Shaking** (analyzing import graphs to remove unused code).
- Automatically splits code chunks to optimize page load speeds.

---

## 5. Real Production Configurations

### 1. Vite Environment Variables (`.env`)
Configuring different backend endpoints for local dev and production:
```javascript
// .env.development
VITE_API_URL=http://localhost:5000/api
VITE_ANALYTICS_ID=DEV_TRACKER

// .env.production
VITE_API_URL=https://api.stripe-clone.com
VITE_ANALYTICS_ID=PROD_TRACKER
```

### 2. Path Aliases (`vite.config.js`)
Configuring custom paths to avoid messy relative imports (e.g., `../../../components/Button`).
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
```

### 3. API Proxy Configuration
Preventing CORS issues in development by proxying API calls to a local backend server:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

### 4. Customizing Production Chunk Splits
Preventing single large bundle warnings by separating third-party libraries (vendors) into dedicated chunks:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            return 'vendor'; // separates react components from other node modules
          }
        },
      },
    },
  },
});
```

### 5. Gzip/Brotli Build Compression
Configuring build plugins to automatically compress output files for production servers:
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [react(), viteCompression({ algorithm: 'brotliCompress' })],
});
```

---

## 6. Progressive Coding (Build Setup Evolution)

### Level 1: Beginner (No Build Tools - Static CDN imports)
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <!-- Load React directly from CDN (Slow, no JSX parsing support without extra engines) -->
  <script src="https://unpkg.com/react@19/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@19/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    function App() {
      return <h1>Hello from CDN React</h1>;
    }
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

### Level 2: Better (Minimal Manual Bundling with ESBuild Script)
```javascript
// build.js
// Executing build from terminal using esbuild without setup frameworks
require('esbuild').build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/bundle.js',
  loader: { '.js': 'jsx' }, // Enable JSX parsing
  minify: true,
  sourcemap: true,
}).catch(() => process.exit(1));
```

### Level 3: Production (Standard Vite Project Config)
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // Auto-open browser
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});
```

### Level 4: Enterprise (Dynamic Production Optimizations Config)
```javascript
// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the active mode (development / production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      // Generates a visual report of our bundle size breakdown in production build
      mode === 'production' && visualizer({ filename: 'bundle-report.html', open: false })
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      strictPort: true, // Error if port is already in use
    },
    build: {
      target: 'esnext',
      outDir: 'build-dist',
      minify: 'esbuild', // fast minification
      cssMinify: true,
      reportCompressedSize: true, // logs output size details in output console
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        }
      }
    }
  };
});
```

---

## 7. Common Mistakes

1. **Checking `node_modules` or `.env` files into Git:**
   Never commit local builds, dependency folders, or secret environment keys. Always include a `.gitignore` containing `node_modules/`, `dist/`, and `.env*.local`.
2. **Missing `VITE_` prefix on env variables:**
   Vite only exposes variables prefixed with `VITE_` to client-side code (e.g., `import.meta.env.VITE_API_URL`). Non-prefixed variables are hidden to prevent accidental leaks of backend secrets.
3. **Using wrong dependencies classification:**
   Installing build dependencies (e.g. `vite`, `sass`, `@types/react`) in `dependencies` instead of `devDependencies`. This bloats production package metadata structures.
4. **Not specifying JSX imports correctly or missing `.jsx` extensions:**
   In Vite, components using JSX *must* use the `.jsx` or `.tsx` extension, otherwise the compiler will treat them as standard JS files and fail to parse brackets.

---

## 8. Best Practices

1. **Verify Node Version:** Maintain consistent node engines within the development group by configuring `"engines": { "node": ">=20.0.0" }` in `package.json`.
2. **Utilize Path Aliases:** Setup path configurations early to keep imports readable and maintainable during scaling.
3. **Audit Bundles Regularly:** Periodically check build outputs using bundle analysis tools to prevent code bloat from heavy third-party packages.

---

## 9. Interview Preparation

### Q1: Why is Vite significantly faster than Webpack during development?
**Answer:** Webpack builds and bundles the entire application code sequentially before serving. Vite avoids this by dividing code into dependencies and source code. Dependencies are pre-compiled using fast ESBuild. Source code is not bundled; Vite serves it directly as native ES Modules (ESM). The browser does the work of resolving imports, and Vite only compiles modules dynamically when requested by the current viewport.

### Q2: What is Hot Module Replacement (HMR) and how does it maintain application state?
**Answer:** HMR allows a dev server to swap updated modules in memory over a WebSocket connection without refreshing the entire browser page. In React, HMR works in tandem with React Fast Refresh. It updates the rendering functions but preserves the component tree's existing state nodes (like user inputs or open menus), speeding up UI debugging.

### Q3: What is "Tree Shaking" and how does it optimize production builds?
**Answer:** Tree Shaking is a form of dead-code elimination. It relies on the static structure of ES modules (`import` and `export`) rather than dynamic runtime imports. During compilation, the bundler (Rollup in Vite) analyzes the dependency tree. Any modules or export declarations that are imported but never invoked are excluded from the final production bundle.

---

## 10. Homework

1. **Setup Development API Proxy:** Create a new Vite app, customize the config file to proxy all `/api/*` endpoints to a fake local backend address (`http://localhost:8080`), and confirm the local request routes in your browser network tab.
2. **Path Alias Restructuring:** Convert a mock multi-directory react structure with deep nested imports to use the `@/` prefix, and resolve all configurations in your `vite.config.js` resolve options.
3. **Environment Multi-Stage Configurations:** Configure separate `.env.development`, `.env.staging`, and `.env.production` files. Render the current environment name and API endpoint on your application home screen.
4. **Manual Chunk Splitting Experiment:** Install a heavy library (e.g., `lodash-es` or `chart.js`), configure a custom rollup option to split this dependency into a separate vendor JS file, and compare the chunk outputs before and after.
5. **Vite Bundle Analysis:** Integrate the `rollup-plugin-visualizer` plugin, execute a production build, and analyze the resulting HTML report to find the heaviest vendor library in your project bundle.
