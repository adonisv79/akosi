import { defineConfig } from "vite";
import i18n from "vite-plugin-i18n";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    i18n({
      // Set the directory containing translation files
      include: /src\/locales\/\w+\.(json|json5|yaml|yml)$/i,
      // Set the default language
      defaultLocale: 'en',
    }),
  ],
});
