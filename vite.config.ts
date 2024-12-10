/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'
import path from 'path'

// Extend UserConfig type to include test config
interface VitestConfigExport extends UserConfig {
  test: {
    globals: boolean;
    environment: string;
    setupFiles: string[];
  }
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
} as VitestConfigExport)
