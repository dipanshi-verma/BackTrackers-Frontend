# 🔍 BackTrackers – Lost & Found

> A modern Lost & Found web application built with **React + Vite**, designed to help people report, track, and recover lost items.

🌐 **Live Demo:** [https://backtrackers.netlify.app/](https://backtrackers.netlify.app/)

---

## 📖 About

BackTrackers is a community-driven Lost & Found platform where users can post lost or found items, browse listings, and connect with others to reunite people with their belongings.

---

## ✨ Features

- 📋 Post lost or found item listings
- 🔎 Search and browse reported items
- 📍 Location-based item tracking
- 📸 Image upload for items
- 📱 Fully responsive design
- ⚡ Lightning-fast with Vite HMR

---

## 🛠️ Tech Stack

| Technology              | Usage                          |
|-------------------------|--------------------------------|
| React 18                | Frontend UI library            |
| Vite                    | Build tool & dev server        |
| @vitejs/plugin-react    | Babel-powered Fast Refresh     |
| ESLint                  | Code linting                   |
| Netlify                 | Hosting & deployment           |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/backtrackers.git

# 2. Move into the project folder
cd backtrackers

# 3. Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The app supports **Hot Module Replacement (HMR)** for a smooth development experience.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint the Code

```bash
npm run lint
```

---

## 📁 Project Structure

```
backtrackers/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons, fonts
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page-level components
│   ├── App.jsx             # Root component & routing
│   └── main.jsx            # Application entry point
├── .eslintrc.cjs           # ESLint configuration
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
└── package.json
```

---

## ⚙️ Vite Plugins

This project uses the official Vite React plugin:

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)** — Uses [Babel](https://babeljs.io/) for Fast Refresh

> **Alternative:** You can swap to [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) which uses [SWC](https://swc.rs/) for faster builds.

---

## 🔧 ESLint Configuration

The project includes basic ESLint rules. For production-grade apps, consider expanding to TypeScript with type-aware lint rules:

1. Configure the top-level `parserOptions` in your ESLint config:

```js
export default {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

2. Replace `plugin:react/recommended` with `plugin:react/jsx-runtime`.

Check out the [TypeScript + Vite template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) and [`typescript-eslint`](https://typescript-eslint.io) for full setup.

---

## 🌍 Deployment (Netlify)

This project is deployed on **Netlify**.

### Deploy via Netlify Dashboard

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Set the following:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy**

### Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ by the **BackTrackers Team**

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://backtrackers.netlify.app/)
