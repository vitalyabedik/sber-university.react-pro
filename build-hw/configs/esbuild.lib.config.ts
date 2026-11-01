import { build } from "esbuild";

// Режим задаётся флагом CLI: npm run build:lib:dev  →  configs/esbuild.lib.config.ts --dev
const isDev = process.argv.includes("--dev");

const buildOptions = {
  entryPoints: {
    index: "lib/index.ts",
    math: "lib/math.ts",
    string: "lib/string.ts",
  },
  // React и lodash не входят в бандл — библиотека отдаёт их пользователю
  external: ["react", "react-dom", "lodash"],
  bundle: true,
  platform: "neutral" as const,
  target: ["es2020"],
  // dev: без минификации; prod: minify + sourcemap
  minify: !isDev,
  sourcemap: "linked" as const,
  metafile: true,
  logLevel: "info" as const,
  define: {
    "process.env.NODE_ENV": JSON.stringify(isDev ? "development" : "production"),
  },
};

// Отдельные каталоги и расширения: при outdir: 'dist/lib' второй формат
// перезаписывал файлы первого (esm → cjs) с тем же именем
const formats = [
  { format: "esm" as const, outdir: "dist/lib/esbuild/esm", ext: ".mjs" },
  { format: "cjs" as const, outdir: "dist/lib/esbuild/cjs", ext: ".cjs" },
];

const main = async () => {
  for (const { format, outdir, ext } of formats) {
    const result = await build({
      ...buildOptions,
      format,
      outdir,
      outExtension: { ".js": ext },
      // esm может переиспользовать общий код через чанки, cjs — нет
      splitting: format === "esm",
    });

    const outputs = Object.entries(result.metafile!.outputs)
      .filter(([path]) => !path.endsWith(".map"))
      .map(([path, meta]) => `${path} — ${meta.bytes} B`);

    console.log(`[lib:${format}]`, outputs.join("\n  "));
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
