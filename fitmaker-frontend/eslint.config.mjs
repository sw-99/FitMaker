// eslint.config.mjs
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Next 권장 규칙 (TypeScript 포함)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 전역 규칙
  {
    plugins: {
      import: importPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      // export 컨벤션: 시스템 파일 외 default 금지
      "import/no-default-export": "error",

      // Hooks 규칙
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // 일반 권장
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  },

  // ✅ Next 시스템 파일은 default export 허용 (src/app & app 모두 지원)
  {
    files: [
      "src/app/**/page.{ts,tsx}",
      "src/app/**/layout.{ts,tsx}",
      "src/app/**/template.{ts,tsx}",
      "src/app/**/error.{ts,tsx}",
      "src/app/**/loading.{ts,tsx}",
      "src/app/**/not-found.{ts,tsx}",
      "src/app/**/default.{ts,tsx}",
      "app/**/page.{ts,tsx}",
      "app/**/layout.{ts,tsx}",
      "app/**/template.{ts,tsx}",
      "app/**/error.{ts,tsx}",
      "app/**/loading.{ts,tsx}",
      "app/**/not-found.{ts,tsx}",
      "app/**/default.{ts,tsx}",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },

  // Prettier와 충돌하는 포맷팅 룰 끄기 (포맷은 Prettier에 위임)
  prettier,
];
