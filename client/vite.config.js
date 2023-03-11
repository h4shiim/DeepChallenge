import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Set the publicPath to the root of your website
        publicPath: '/',
      },
    },
    // Add your favicon to the assets directory
    assets: {
      // Make sure the file path is correct
      // and change the name if necessary
      favicon: './src/assets/favicon.ico',
    },
    server: {
      // Serve your files with MIME type "application/javascript"
      mimeTypes: {
        "application/javascript": ["js", "jsx"],
      },
    },
  },
});
