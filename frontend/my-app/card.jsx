// src/components/ui/card.jsx
import React from 'react';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QLir4p0piyi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
});

export const Card = ({ children, className }) => (
  <div className={`card ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

export const CardTitle = ({ children }) => (
  <div className="card-title">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="card-content">{children}</div>
);

export const CardFooter = ({ children }) => (
  <div className="card-footer">{children}</div>
);
