import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // listen on the LAN IP so other computers can open it
    // other machines hit Vite, Vite forwards to LM Studio on this box: no CORS, LM Studio stays on localhost
    proxy: { '/lmstudio': { target: process.env.LMSTUDIO_URL || 'http://localhost:1234', rewrite: p => p.replace(/^\/lmstudio/, '') } },
  },
})
