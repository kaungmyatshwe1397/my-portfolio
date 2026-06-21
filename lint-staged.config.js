// Runs linters on staged files before commit
module.exports = {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{css,json,md}": ["prettier --write"],
};
