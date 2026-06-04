import type { StorybookConfig } from 'storybook-solidjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [],
  "framework": "storybook-solidjs-vite"
};
export default config;