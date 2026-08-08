import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://fransuelton.dev",

  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: "pt",
        locales: {
          pt: "pt-BR",
          en: "en-US",
          es: "es-ES",
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // canvaskit-wasm is CJS and resolves its .wasm via __dirname, which breaks
      // once Vite inlines it into the ESM worker bundle. Keep it external: the OG
      // route is prerendered, so it only ever runs in Node at build time.
      external: ["canvaskit-wasm"],
    },
  },

  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // `compile` runs sharp at build time on prerendered pages (Cloudflare has no
  // sharp at runtime). Every page using <Image> here is prerendered.
  adapter: cloudflare({ imageService: "compile" })
});