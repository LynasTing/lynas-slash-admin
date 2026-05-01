import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import MotionContainer from '@/components/animate/motion-container';
import { m } from 'motion/react';
import { varBounce } from '@/components/animate/variants/bounce';
import { Text, Title } from '@/ui/typography';
import { NavLink } from 'react-router';
import { GLOBAL_CONFIG } from '@/config/global';
import Button from '@/ui/button';

interface ErrorLayoutProps {
  /**
   * 错误页主标题（必填）
   * Main title of the error page (required)
   */
  title: string;

  /**
   * 错误描述信息，可传字符串或 JSX 内容
   * Description of the error, supports string or JSX content
   */
  desc?: ReactNode;

  /**
   * 错误页插图（通常为 SVG 或自定义图形）
   * Illustration for the error page (usually SVG or custom graphic)
   */
  svg?: ReactNode;

  /**
   * 浏览器标签页标题（用于 SEO 和用户体验）
   * Document title shown in browser tab (for SEO and UX)
   */
  helmetTitle?: string;

  /**
   * 返回按钮跳转路径（默认使用全局配置的首页路径）
   * Target path for the "back" button (defaults to global home route)
   */
  homePath?: string;

  /**
   * 返回按钮显示文本
   * Text displayed on the action button
   */
  buttonText?: string;

  /**
   * 插槽配置（用于自定义布局内容）
   * Slot configuration for custom layout content
   */
  slots?: {
    /**
     * 底部区域内容（会覆盖默认的返回按钮）
     * Footer content (overrides the default "back to home" button)
     */
    footer?: ReactNode;
  };
}

export default function ErrorLayout({
  helmetTitle,
  title,
  desc,
  svg,
  slots = {},
  homePath = GLOBAL_CONFIG.defaultRoute,
  buttonText
}: ErrorLayoutProps) {
  return (
    <>
      {helmetTitle && (
        <Helmet>
          <title>{helmetTitle}</title>
        </Helmet>
      )}
      <div className="flex justify-center items-center max-w-[400px] h-full m-auto">
        <MotionContainer className="flex justify-center items-center flex-col gap-2 w-full px-2">
          <m.div variants={varBounce().in}>
            <Title as="h2" className="text-center">
              {title}
            </Title>
          </m.div>
          {desc && (
            <m.div variants={varBounce().in}>
              <Text variant="subTitle1" color="secondary" align="center">
                {desc}
              </Text>
            </m.div>
          )}
          {svg && <m.div variants={varBounce().in}>{svg}</m.div>}
          {slots.footer ? (
            slots.footer
          ) : (
            <NavLink to={homePath} className="flex justify-center w-full mt-4">
              <Button size="lg" variant="contrast">
                {buttonText}
              </Button>
            </NavLink>
          )}
        </MotionContainer>
      </div>
    </>
  );
}
