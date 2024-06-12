import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    environmentMatchGlobs: [['src/infra/http/controllers/**', 'prisma']],
  },
  plugins: [tsConfigPaths()],
})