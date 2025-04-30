import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',  // Allows external access
//     port: 5173,       // Change if needed
//     strictPort: true, // Ensures the port is not changed
//     hmr: {
//       clientPort: 443, // Required for ngrok to work properly
//     },
//     allowedHosts: ['.ngrok-free.app'], // Add your ngrok URL
//   },
//   optimizeDeps: {
//     include: ["@ar-js-org/ar.js"], 
//   },
// });

