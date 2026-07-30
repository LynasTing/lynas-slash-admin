import { type ComponentProps } from 'react';
import { cn } from '@/utils';

type CodeExampleProps = ComponentProps<'code'> & {
  /**
   * 需要展示的 JSX 源码。
   * 代码以字符串传入，避免示例页的可运行 JSX 与文档内容发生耦合。
   *
   * JSX source code to display.
   * The code is provided as a string so runnable examples remain decoupled from documentation content.
   */
  code: string;
};

/**
 * 渲染组件示例的 JSX 源码。
 * 代码区允许横向滚动，窄屏不会压缩代码或影响页面的主示例布局。
 *
 * Renders JSX source code for a component example.
 * The code area scrolls horizontally so narrow screens do not compress code or affect the primary example layout.
 */
export default function CodeExample({ code, className, ...props }: CodeExampleProps) {
  /**
   * 保留源码换行并生成行号，方便将短示例与相邻渲染结果逐行比对。
   *
   * Preserve source lines and generate line numbers so short examples can be compared line by line with nearby output.
   */
  const codeLines = code.split('\n');

  return (
    <pre className="overflow-x-auto border border-border bg-muted/50 py-3 text-left text-xs leading-5 shadow-sm sm:text-sm">
      <code className={cn('font-mono block min-w-max text-foreground', className)} {...props}>
        <span className="mb-2 block border-b border-border px-4 pb-2 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground">
          TSX
        </span>
        {codeLines.map((line, index) => (
          <span key={`${index}-${line}`} className="grid grid-cols-[2rem_1fr] px-4">
            <span className="text-right text-muted-foreground/60 select-none">{index + 1}</span>
            <span className="pl-4 whitespace-pre text-foreground">{line || ' '}</span>
          </span>
        ))}
      </code>
    </pre>
  );
}
