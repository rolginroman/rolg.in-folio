import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { resolve } from "path";
import purgecss from "astro-purgecss";
import critters from "@otterlord/astro-critters";
import basicSsl from "@vitejs/plugin-basic-ssl";
import sitemap from "@astrojs/sitemap";
import { robotsSitemap } from "./tools/vite-plugins/robots-sitemap.mjs";

const env = loadEnv(process.env.MODE, resolve(process.cwd(), "environment"), "");
const { R_BASE_URL, R_HOSTNAME, SSL } = env;

// https://astro.build/config
export default defineConfig({
  site: `${R_HOSTNAME}${R_BASE_URL}`,
  base: R_BASE_URL,
  output: "static",
  integrations: [
    sitemap({
      lastmod: new Date(),
      changefreq: "monthly",
    }),
    robotsSitemap(),
    critters({
      critters: {
        pruneSource: true,
        publicPath: R_BASE_URL,
      },
    }),
    purgecss({
      variables: false,
    }),
  ],
  build: {
    assets: "public",
  },
  compressHTML: true,
  vite: {
    envDir: "environment",
    server: {
      https: !!SSL,
    },
    plugins: [SSL ? basicSsl() : undefined],
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ["src/styles"],
        },
      },
    },
  },
});
