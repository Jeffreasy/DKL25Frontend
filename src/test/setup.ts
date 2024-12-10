import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend global type
declare global {
  interface Window {
    vi: typeof import('vitest')['vi']
  }
}

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers as any)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Make vi available globally
window.vi = vi 