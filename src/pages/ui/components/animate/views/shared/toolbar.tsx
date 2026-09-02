import { Icon } from '@/components/icon';
import { type ReactNode } from 'react';

type Props = {
  /**
   * 重置当前示例状态
   * Reset the current demo state
   */
  onRefresh: VoidFunction;

  /**
   * 左侧工具栏内容，未传入时保留占位以维持刷新按钮右对齐
   * Left-side toolbar content; an empty placeholder keeps the refresh button aligned to the right
   */
  children?: ReactNode;
};

export default function Toolbar({ onRefresh, children }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between">
      {children ?? <div />}
      <Icon icon="material-symbols:refresh" className="cursor-pointer" size={24} onClick={onRefresh} />
    </div>
  );
}
