import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: 'https://rotary-dev-fellowship.pages.dev',
  image: {
    domains: ["images.unsplash.com"],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    fallback: {
      fr: "en"
    },
    routing: {
      prefixDefaultLocale: false
    }
  },
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap(),
    starlight({
      title: 'RotaryDEV Fellowship Docs',
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        // de: { label: "Deutsch", lang: "de" },
        // es: { label: "Español", lang: "es" },
        // fa: { label: "Persian", lang: "fa", dir: "rtl" },
        // fr: { label: "Français", lang: "fr" },
        // ja: { label: "日本語", lang: "ja" },
        // "zh-cn": { label: "简体中文", lang: "zh-CN" },
      },
      // https://starlight.astro.build/guides/sidebar/
      sidebar: [
        {
          label: "Quick Start Guides",
          // translations: {
          //   de: "Schnellstartanleitungen",
          //   es: "Guías de Inicio Rápido",
          //   fa: "راهنمای شروع سریع",
          //   fr: "Guides de Démarrage Rapide",
          //   ja: "クイックスタートガイド",
          //   "zh-cn": "快速入门指南",
          // },
          autogenerate: { directory: "docs/guides" },
        },
        {
          label: "Resources",
          autogenerate: { directory: "docs/resources" },
        },
      ],
      social: {
        github: "https://github.com/rotary-dev-fellowship",
      },
      disable404Route: true,
      customCss: ["./src/styles/starlight.css"],
      favicon: "/favicon.ico",
      components: {
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: { property: "og:image", content: "https://screwfast.uk" + "/social.png" },
        },
        {
          tag: "meta",
          attrs: { property: "twitter:image", content: "https://screwfast.uk" + "/social.png" },
        },
      ],
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
  ],
  output: "static",
  experimental: {
    clientPrerender: true,
    directRenderScript: true,
  },
});
