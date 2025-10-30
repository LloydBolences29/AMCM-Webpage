import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { analyzer } from 'vite-bundle-analyzer'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), analyzer()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy:{
      '/api': {
        target: 'http://195.68.4.254:2001',
        changeOrigin: true,
        secure: false
      }
    },
  }

})
