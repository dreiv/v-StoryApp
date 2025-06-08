import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  framework: { name: '@storybook/vue3-vite', options: {} },
  core: { disableTelemetry: true },
  viteFinal: (config) => {
    if (config?.resolve?.alias) config.resolve.alias['@'] = '/src'
    config.mode = 'test'

    return config
  },
}
export default config
