import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const swcBinary = resolve("node_modules/.bin/swc");
const entryPoints = ["lib/index.ts", "lib/math.ts", "lib/string.ts"];
const baseConfig = JSON.parse(readFileSync("configs/swc.lib.config.json", "utf8")) as {
  module: { type: string };
};

// swc CLI читает module.type только из конфига, поэтому под каждый формат
// генерируется временный конфиг на базе configs/swc.lib.config.json
const build = (moduleType: "es6" | "commonjs", outDir: string) => {
  const configPath = `configs/.swc.${moduleType}.json`;

  writeFileSync(
    configPath,
    JSON.stringify({ ...baseConfig, module: { ...baseConfig.module, type: moduleType } }, null, 2),
  );

  mkdirSync(outDir, { recursive: true });
  execFileSync(
    swcBinary,
    [
      ...entryPoints,
      "--config-file",
      configPath,
      "--out-dir",
      outDir,
      // без этого swc повторяет структуру lib/ внутри out-dir
      "--strip-leading-paths",
    ],
    { stdio: "inherit" },
  );
};

build("es6", "dist/lib/swc/esm");
build("commonjs", "dist/lib/swc/cjs");
