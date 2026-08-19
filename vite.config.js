import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator'

export default defineConfig({
  plugins: [
    react(),
    javascriptObfuscator({
      include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
      exclude: [/node_modules/, 'src/App.jsx'],
      apply: 'build',
      debugger: true,
      options: {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: false,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: false,
        stringArray: true,
        stringArrayCallsTransform: false,
        stringArrayEncoding: [],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
      }
    })
  ],
  build: {
    sourcemap: false
  }
})
