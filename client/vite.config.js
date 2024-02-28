import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import envCompatible from 'vite-plugin-env-compatible';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { createRequire } from 'node:module';
import nested from 'postcss-nested';


const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react(),
  envCompatible(),
  ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } ),
  nested()
],

});



