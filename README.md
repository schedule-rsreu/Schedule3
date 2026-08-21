# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Kubernetes deployment

Pushes to `main` publish the private image
`ghcr.io/schedule-rsreu/schedule3:<commit-sha>`. Deployment to the existing
`schedule-api` namespace runs only when the repository variable
`K3S_DEPLOY_ENABLED` is set to `true`.

Repository secrets:

- `DEPLOY_HOST` — server IP or DNS name;
- `DEPLOY_USER` — SSH user;
- `DEPLOY_SSH_KEY` — unencrypted private SSH key;
- `DEPLOY_KNOWN_HOSTS` — verified server `known_hosts` line;
- `GHCR_USERNAME` — GitHub user allowed to pull the private package;
- `GHCR_PULL_TOKEN` — classic PAT with `read:packages`.

The Helm release serves `https://schedule.vingp.dev` and
`https://rsreu-schedule.ru` through k3s Traefik.
