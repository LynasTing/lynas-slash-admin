import type { VariantType } from '@/components/animate/variants';
import { Card, CardContent } from '@/ui/card';
import { ScrollArea } from '@/ui/scroll-area';
import { Title } from '@/ui/typography';
import { cn } from '@/utils';

/**
 * 动画分组配置
 * Animation variant group configuration
 *
 * values 只允许使用 variants 注册表中存在的 key，避免控制面板选出无效动画。
 * values only accepts keys registered in the variants map, preventing invalid animation selections.
 */
export type VariantKeysType = {
  /**
   * 分组名称
   * Group name
   */
  type: string;

  /**
   * 分组下可选动画 key
   * Available animation keys in this group
   */
  values: readonly VariantType[];
};

type ControlPanelProps = {
  /**
   * 控制面板渲染的动画分组
   * Animation groups rendered by the control panel
   */
  variantKeys: readonly VariantKeysType[];

  /**
   * 当前选中的动画 key
   * Current selected animation key
   */
  selectedVariant: VariantType;

  /**
   * 获取分组展示文案
   * Get the display label for a variant group
   */
  getGroupLabel: (type: string) => string;

  /**
   * 获取动画展示文案
   * Get the display label for a variant
   */
  getVariantLabel: (variant: VariantType) => string;

  /**
   * 切换动画时触发
   * Called when the selected animation changes
   */
  onChangeVariant: (v: VariantType) => void;
};

export default function ControlPanel({ variantKeys, selectedVariant, getGroupLabel, getVariantLabel, onChangeVariant }: ControlPanelProps) {
  return (
    <Card className="max-h-[480px] py-2.5">
      <CardContent className="pr-2.5 pl-4">
        <ScrollArea className="h-[480px] py-4 pr-2.5">
          {variantKeys.map((item, index) => (
            <div key={item.type} className={index ? 'mt-4' : 'mt-0'}>
              <Title as="h6" className="mb-2">
                {getGroupLabel(item.type)}
              </Title>
              <ul className="flex flex-col gap-y-2">
                {item.values.map(sub => (
                  <li
                    key={sub}
                    className={cn('cursor-pointer rounded-md p-2', selectedVariant === sub && 'bg-primary text-white')}
                    onClick={() => onChangeVariant(sub)}>
                    {getVariantLabel(sub)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
