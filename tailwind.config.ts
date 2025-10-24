/**
 * @file tailwind.config.ts
 * @description tailwindcss 配置文件
 * @see https://tailwindcss.com/docs/configuration
 * @author LynasTing
 * @date 2025-10-24
 */
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {}
    }
  }
} satisfies Config;
