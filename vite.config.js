import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/Website-Project-UEES/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nosotros: resolve(__dirname, "nosotros.html"),
        contacto: resolve(__dirname, "contacto.html"),
        portafolio: resolve(__dirname, "portafolio.html"),
      },
    },
  },
});
