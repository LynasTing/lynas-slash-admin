/**
 * @file tailwind.config.ts
 * @description tailwindcss 配置文件
 * @see https://tailwindcss.com/docs/configuration
 * @author LynasTing
 * @date 2025-10-24
 */
import type { Config } from 'tailwindcss';
import { createColorChannel, createTailwindConfig } from '@/utils';
import { HtmlDataAttribute } from '#/enum';

export default {
  darkMode: ['selector', `[${HtmlDataAttribute.ThemeMode}='dark']`],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /** 项目主题色 / slash admin theme tokens */
        primary: createColorChannel('colors.palette.primary'),
        bg: createColorChannel('colors.background'),
        common: createColorChannel('colors.common'),
        text: createColorChannel('colors.text'),
        action: createTailwindConfig('colors.action'),

        /** Shadcn UI 主题色 / shadcn ui theme tokens */
        /** 基础别名（与组件类名一致，使用短横线命名） */
        'popover': 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        'accent': 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        'muted-foreground': 'var(--muted-foreground)',
        'primary-foreground': 'var(--primary-foreground)',
        'destructive': 'var(--destructive)'
      },
      /** 将设计系统变量注册到 Tailwind（间距、圆角、透明度、层级） */
      spacing: createTailwindConfig('spacing'),
      borderRadius: createTailwindConfig('borderRadius'),
      opacity: createTailwindConfig('opacity'),
      zIndex: createTailwindConfig('zIndex')
      }
    }
  }
} satisfies Config;
