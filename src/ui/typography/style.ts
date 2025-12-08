import { cva } from 'class-variance-authority';

const colorVariants = {
  default: 'text-text-primary',
  secondary: 'text-text-secondary',
  disabled: 'text-text-disabled',
  primary: 'text-primary',
  info: 'text-info',
  error: 'text-error',
  warning: 'text-warning',
  success: 'text-success'
};

const alignVariants = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

export const titleVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    as: {
      h1: 'text-4xl font-extrabold lg:text-5xl',
      h2: 'text-3xl font-extrabold',
      h3: 'text-2xl font-bold',
      h4: 'text-xl font-bold',
      h5: 'text-lg font-bold',
      h6: 'text-base font-semibold'
    },
    color: colorVariants,
    align: alignVariants
  },
  defaultVariants: {
    as: 'h1',
    color: 'default',
    align: 'left'
  }
});

export const textVariants = cva('', {
  variants: {
    variant: {
      /** 副标题 / Subtitle */
      subTitle1: 'text-base font-semibold',
      subTitle2: 'text-sm font-normal',

      /** 正文 / Body */
      body1: 'text-base font-normal',
      body2: 'text-sm font-normal',

      /** 说明文字 / Caption */
      caption: 'text-xs font-normal',

      /** 代码 / Code */
      code: 'text-sm font-normal font-mono bg-muted relative rounded px-[0.3rem] py-[0.2rem]'
    },
    color: colorVariants,
    align: alignVariants
  },
  defaultVariants: {
    variant: 'body1',
    color: 'default',
    align: 'left'
  }
});
