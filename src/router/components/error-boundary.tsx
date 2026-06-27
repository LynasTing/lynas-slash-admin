import { ScrollArea } from '@/ui/scroll-area';
import { isRouteErrorResponse, useRouteError } from 'react-router';
import { Title } from '@/ui/typography';
import { themeVars } from '@/theme/theme.css';
import { type ReactNode } from 'react';

/**
 * 从浏览器错误堆栈中提取源码路径和函数名。
 * 这里只做开发期辅助定位，不把解析结果作为业务逻辑依赖。
 * @param stack - Error 对象携带的堆栈字符串。
 * @returns 可展示的源码路径和函数名；解析失败时返回 null 字段。
 *
 * Extracts the source path and function name from a browser error stack.
 * This is only a development-time debugging aid and is not used as business logic.
 * @param stack - Stack string carried by an Error object.
 * @returns Displayable source path and function name; fields are null when parsing fails.
 */
function parseStackTrace(stack?: string) {
  if (!stack) {
    return {
      filePath: null,
      functionName: null
    };
  }

  const filePathMatched = stack.match(/\/src\/[^?]+/);
  const functionNameMatched = stack.match(/at (\S+)/);

  return {
    filePath: filePathMatched?.[0] ?? null,
    functionName: functionNameMatched?.[1] ?? null
  };
}

/**
 * 格式化堆栈定位信息。
 * 解析结果可能只包含路径或函数名，因此需要过滤空值，避免页面展示 null。
 * @param filePath - 从堆栈中解析出的源码路径。
 * @param functionName - 从堆栈中解析出的函数名。
 * @returns 拼接后的定位文本；没有可用信息时返回 null。
 *
 * Formats stack location information.
 * The parsed result may contain only a path or only a function name, so empty values are filtered to avoid rendering null.
 * @param filePath - Source path parsed from the stack.
 * @param functionName - Function name parsed from the stack.
 * @returns Joined location text, or null when no useful information exists.
 */
function formatStackLocation(filePath: string | null, functionName: string | null) {
  const stackParts = [filePath, functionName ? `(${functionName})` : null].filter(Boolean);

  return stackParts.length > 0 ? stackParts.join(' ') : null;
}

/**
 * 错误摘要文本。
 * 组件复用同一套错误色和左边框样式，避免路由错误和运行时错误出现视觉差异。
 *
 * Error summary text.
 * The component reuses the same error color and left-border treatment so route errors and runtime errors stay visually consistent.
 */
function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p
      className="m-0 bg-[#2a1e1e] px-3 py-4 leading-normal font-bold whitespace-pre-wrap"
      style={{
        color: themeVars.colors.palette.error.default,
        borderLeft: `2px solid ${themeVars.colors.palette.error.default}`
      }}>
      {children}
    </p>
  );
}

/**
 * 根据 React Router 捕获到的错误类型渲染错误内容。
 * 路由响应错误展示状态码，运行时 Error 展示摘要；堆栈和源码定位只在开发环境展示，避免生产环境泄露内部路径。
 * @param error - useRouteError 返回的未知错误值。
 * @returns 可直接放入错误容器的 React 内容。
 *
 * Renders error content according to the error type captured by React Router.
 * Route response errors show status details, runtime Errors show a summary, and stack/source details are shown only in development to avoid leaking internal paths in production.
 * @param error - Unknown error value returned by useRouteError.
 * @returns React content ready to render inside the error container.
 */
function renderErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Title as="h2">
          {error.status}: {error.statusText}
        </Title>
        <ErrorMessage>{typeof error.data === 'string' ? error.data : JSON.stringify(error.data, null, 2)}</ErrorMessage>
      </>
    );
  }

  if (error instanceof Error) {
    const { filePath, functionName } = parseStackTrace(error.stack);
    const stackLocation = formatStackLocation(filePath, functionName);

    return (
      <>
        <Title as="h2">Unexpected Application Error!</Title>
        <ErrorMessage>
          {error.name}: {error.message}
        </ErrorMessage>
        {import.meta.env.DEV && (
          <pre
            className="m-0 overflow-auto rounded-[inherit] bg-[#111111] p-4 leading-normal whitespace-pre-wrap"
            style={{
              color: themeVars.colors.palette.warning.default
            }}>
            {error.stack}
          </pre>
        )}
        {import.meta.env.DEV && stackLocation && (
          <p
            className="mt-4"
            style={{
              color: themeVars.colors.palette.info.default
            }}>
            {stackLocation}
          </p>
        )}
      </>
    );
  }

  return <Title as="h2">Unknown Error</Title>;
}

/**
 * 路由错误边界。
 * 该组件作为 React Router 的 errorElement 使用，负责兜底展示路由加载、渲染或 action/loader 中抛出的错误。
 *
 * Route error boundary.
 * This component is used as React Router's errorElement and displays errors thrown during route loading, rendering, actions, or loaders.
 */
export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <ScrollArea className="h-screen w-full">
      <div className="flex min-h-screen flex-1 flex-col items-center bg-[#2c2c2e] px-4 py-[10vh] text-white">
        <div className="flex w-full max-w-[960px] flex-col gap-6 rounded-lg bg-[#1c1c1e] p-5">{renderErrorMessage(error)}</div>
      </div>
    </ScrollArea>
  );
}
