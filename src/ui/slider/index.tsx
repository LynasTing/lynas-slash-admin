import { ComponentProps, useMemo } from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';
import { cn } from '@/utils';
import { sliderRootVariants, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants } from './style';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/ui/tooltip';

type TooltipMode = 'always' | 'hover' | 'never';

interface SliderProps extends ComponentProps<typeof SliderPrimitive.Root> {
  tooltipMode: TooltipMode;
}

/**
 * Slider 组件
 * - 可拖动的滑块，用于选择数值或数值区间
 * - 支持单值或范围值
 * - 支持在滑块上显示 Tooltip，可设置显示模式：always / hover / never
 *
 * Slider component
 * - Draggable slider for selecting single value or value range
 * - Supports one or multiple thumbs
 * - Tooltip on thumb can be always visible, on hover, or disabled
 */
function Slider({
  /** 受控值 / Controlled value */
  value,
  /** 非受控默认值 / Default value for uncontrolled slider */
  defaultValue,
  /** 滑块最小值 / Minimum slider value */
  min = 0,
  /** 滑块最大值 / Maximum slider value */
  max = 100,
  /** Tooltip 显示模式 / Tooltip display mode: always | hover | never */
  tooltipMode = 'hover',
  /** 自定义样式 / Custom CSS class */
  className,
  /** 其他 Radix Slider 原生属性 / Other native Radix Slider props */
  ...props
}: SliderProps) {
  // 根据 value / defaultValue / min/max 生成数组，用于渲染 Thumb 个数
  // Single value -> [_values.length = 1], Range -> [_values.length = 2]
  const _values = useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      className={cn(sliderRootVariants(), className)}
      {...props}>
      {/* Slider 轨道 / Slider track */}
      <SliderPrimitive.Track data-slot="slider-track" className={cn(sliderTrackVariants())}>
        {/* 已选区间 / Selected range */}
        <SliderPrimitive.Range data-slot="slider-range" className={cn(sliderRangeVariants())} />
      </SliderPrimitive.Track>

      {/* 根据 _values 长度渲染对应数量的 Thumb / Render thumbs based on _values length */}
      {Array.from({ length: _values.length }, (_, idx) => (
        <Tooltip key={idx} open={tooltipMode === 'always' ? true : undefined}>
          {/* Thumb 触发 Tooltip / Trigger Tooltip */}
          <TooltipTrigger asChild>
            <SliderPrimitive.Thumb data-slot="slider-thumb" className={cn(sliderThumbVariants())} />
          </TooltipTrigger>
          {/* Tooltip 内容，根据 tooltipMode 决定是否显示 / Tooltip content, determined by tooltipMode */}
          {tooltipMode !== 'never' && <TooltipContent>{_values[idx]}</TooltipContent>}
        </Tooltip>
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
