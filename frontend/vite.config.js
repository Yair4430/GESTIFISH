<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return{
    define: {
      'process.env': env
    },
      plugins: [react()],
   }
})
>>>>>>> d696cfa811b94258594715c1cb43b7b48cd9c34d
