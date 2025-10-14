npm install gh-pages --save-dev

Package.json
  "homepage": "https://HarshAvidclan.github.io/time_card",

in scripts sectio
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"

in console Command
    npm run deploy

add the Base Path in the vite.config.ts
    base: "./"