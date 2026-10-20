import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  lint: {
    plugins: ["react", "oxc"],
    categories: {
      correctness: "error",
      suspicious: "warn",
      pedantic: "warn",
    },
    settings: {
      "jsx-runtime": "react",
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/rules-of-hooks": "error",
      "react/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "typescript/no-non-null-assertion": "error",
      "typescript/prefer-readonly-parameter-types": "off",
      "typescript/strict-boolean-expressions": "off",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    ignorePatterns: ["**/*.test.tsx", "**/*.test.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },
  fmt: {
    tabWidth: 2,
    useTabs: false,
    printWidth: 80,
    trailingComma: "es5",
    singleQuote: false,
    jsxSingleQuote: false,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    singleAttributePerLine: true,
    endOfLine: "lf",
    sortPackageJson: false,
    ignorePatterns: ["node_modules/", "dist/", "build/", ".wrangler/"],
  },
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
  },
  plugins: lazyPlugins(() => [react({ compiler: true })]),
  base: "/",
});
