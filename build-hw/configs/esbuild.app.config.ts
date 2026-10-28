import { context } from "esbuild";

// Режим задаётся флагом CLI: npm run build:dev  →  configs/esbuild.app.config.ts --dev
const isDev = process.argv.includes("--dev");
const minify = !isDev;

const buildOptions = {
  entryPoints: {
    app: "app/index.ts",
  },
  outdir: "dist",
  entryNames: "app",
  chunkNames: "chunks/[name]-[hash]",
  bundle: true,
  // Динамические import() превращаются в отдельные чанки только с splitting
  splitting: true,
  format: "esm" as const,
  platform: "browser" as const,
  target: ["es2020"],
  // dev: без минификации — быстрее и понятнее стектрейсы; prod: minify + sourcemap
  minify,
  sourcemap: "linked" as const,
  metafile: true,
  logLevel: "info" as const,
  define: {
    "process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production"),
  },
};

const main = async () => {
  const ctx = await context(buildOptions);

  await ctx.rebuild();

  if (!isDev) {
    await ctx.dispose();
    console.log("[app] prod: минифицированный бандл в dist/app.js");

    return;
  }

  // watch держит процесс живым и пересобирает бандл на каждое изменение
  await ctx.watch();
  console.log("[app] dev: watch включён, изменения пересобираются в dist/app.js");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
