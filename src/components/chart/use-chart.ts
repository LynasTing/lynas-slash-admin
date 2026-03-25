import type { ApexOptions } from 'apexcharts';
import { themeVars } from '@/theme/theme.css';
import { presetsColors, paletteColors } from '@/theme/tokens/color';
import type { ThemeColorPresets, ThemeMode } from '#/enum';
import { rgbAlpha, removePx } from '@/utils';
import { breakpointsTokens } from '@/theme/tokens/breakpoint';
import { useSettingStoreState } from '@/store/setting';
import { mergeDeepRight } from 'ramda';

/**
 * 饼图 / 环形图 中显示的“总数”标签配置
 * Configuration for the "Total" label in pie/donut charts
 */
const LABEL_TOTAL = {
  show: true,
  label: 'Total',
  color: themeVars.colors.text.secondary,
  fontSize: themeVars.typography.fontSize.sm,
  lineHeight: themeVars.typography.lineHeight.tight
};

/**
 * 饼图 / 环形图 中显示的数值标签配置
 * Configuration for the value label in pie/donut charts
 */
const LABEL_VALUE = {
  offsetY: 8,
  color: themeVars.colors.text.primary,
  fontSize: themeVars.typography.fontSize.sm,
  lineHeight: themeVars.typography.lineHeight.tight
};

const baseChartOptions = (themeColorPresets: ThemeColorPresets, themeMode: ThemeMode): ApexOptions => {
  return {
    /**
     * 颜色体系
     * Color system
     */
    colors: [
      presetsColors[themeColorPresets].default,
      paletteColors.info.default,
      paletteColors.warning.default,
      paletteColors.error.default,
      paletteColors.success.default,

      paletteColors.warning.dark,
      paletteColors.info.dark,
      paletteColors.error.dark,
      paletteColors.success.dark
    ],

    chart: {
      // 是否显示工具栏 / Whether to display the chart toolbar
      toolbar: {
        show: false
      },
      // 是否启用缩放 / Whether zooming is enabled
      zoom: {
        enabled: false
      },
      // 父容器高度偏移量，用于计算图表高度 / Parent container height offset for calculating chart height
      parentHeightOffset: 0,
      // 图表文字默认颜色 / Default chart text color
      foreColor: themeVars.colors.text.disabled,
      // 图表字体 / Chart Font family
      fontFamily: themeVars.typography.fontFamily.openSans,
      animations: {
        // 启用动画 / Enable animations
        enabled: true,
        // 动画速度（毫秒） / Animation speed in milliseconds
        speed: 360,
        // 渐进式动画配置 / Gradual animation configuration
        animateGradually: {
          // 是否启用渐进式动画 / Whether gradual animation is enabled
          enabled: true,
          // 渐进动画延迟时间（毫秒） / Delay time for gradual animation in milliseconds
          delay: 120
        },
        // 动态动画配置 / Dynamic animation configuration
        dynamicAnimation: {
          // 是否启用动态动画 / Whether dynamic animation is enabled
          enabled: true,
          // 动态动画延迟时间（毫秒） / Delay time for dynamic animation in milliseconds
          speed: 360
        }
      },
      // 父容器大小变化时是否重绘图表 / Whether to redraw the chart when the parent container size changes
      redrawOnParentResize: true,
      // 窗口大小变化时是否重绘图表 / Whether to redraw the chart when the window size changes
      redrawOnWindowResize: true
    },

    /**
     * 图表元素交互状态配置
     * Configuration for chart element interaction states
     */
    states: {
      // 悬停状态样式 / Styles applied when hovering
      hover: {
        filter: {
          // 滤镜类型：加深 / Filter type: darken
          type: 'darken'
        }
      },
      // 激活状态样式 / Styles applied when active/selected
      active: {
        filter: {
          // 滤镜类型：加深 / Filter type: darken
          type: 'darken'
        }
      }
    },

    /**
     * 填充样式
     * Fill configuration for chart elements
     */
    fill: {
      // 不透明度 / Opacity of the fill
      opacity: 1,
      // 渐变效果 / Gradient configuration
      gradient: {
        // 渐变类型 / Type of gradient
        type: 'vertical',
        // 渐变强度 / Shade intensity
        shadeIntensity: 0,
        // 渐变起始不透明度 / Starting opacity
        opacityFrom: 0.4,
        // 渐变结束不透明度 / Ending opacity
        opacityTo: 0,
        // 渐变停止点 / Gradient stops (0-100)
        stops: [0, 100]
      }
    },

    /**
     * 数据标签配置
     * Data labels configuration
     */
    dataLabels: {
      // 是否显示数据标签 / Whether to display data labels
      enabled: false
    },

    /**
     * 线条配置
     * Stroke configuration for chart lines
     */
    stroke: {
      // 线条宽度 / Width of the line
      width: 2.5,
      // 曲线类型 / Curve type
      curve: 'smooth',
      // 线条端点样式 / Line cap style
      lineCap: 'round'
    },

    /**
     * 网格、坐标轴、标记点、提示信息等通用图表元素配置，用于统一图表显示风格和交互体验
     * Configuration for chart grid, axes, markers, and tooltips, used to standardize chart appearance and interaction
     */
    grid: {
      // 网格虚线样式 / Stroke dash array for grid lines
      strokeDashArray: 3,
      // 网格边框颜色 / Grid border color
      borderColor: themeVars.colors.background.neutral, // TODO: change to gray[500]
      // 内边距 / Padding inside the grid
      padding: { top: 0, right: 0, bottom: 0 },
      // X轴网格线显示 / Show X-axis grid lines
      xaxis: { lines: { show: false } }
    },

    /**
     * X轴配置
     * X-axis configuration
     */
    xaxis: {
      // X轴边框显示 / Show axis border
      axisBorder: { show: false },
      // X轴刻度线显示 / Show axis ticks
      axisTicks: { show: false }
    },

    /**
     * Y轴配置
     * Y-axis configuration
     */
    yaxis: {
      // Y轴刻度数量 / Number of ticks on Y-axis
      tickAmount: 5
    },

    /**
     * 标记点配置
     * Marker configuration
     */
    markers: {
      // 标记点大小 / Size of markers
      size: 0,
      // 标记点边框颜色 / Marker stroke color
      strokeColors: themeVars.colors.background.paper
    },

    /**
     * 提示信息配置
     * Tooltip configuration
     */
    tooltip: {
      // 主题模式 / Theme mode for tooltip (light/dark)
      theme: themeMode,
      // 是否使用序列颜色填充提示框 / Whether to fill tooltip with series color
      fillSeriesColor: false,
      // X轴显示 / Show X value in tooltip
      x: { show: true }
    },

    /**
     * 图例配置
     * Legend configuration
     */
    legend: {
      // 是否显示图例 / Whether to show the legend
      show: false,
      // 字体大小 / Font size
      fontSize: themeVars.typography.fontSize.sm,
      // 图例位置 / Position of the legend
      position: 'top',
      // 图例水平对齐方式 / Horizontal alignment of legend
      horizontalAlign: 'right',
      // 图例标记形状 / Marker shape in legend
      markers: { shape: 'circle' },
      // 字体粗细 / Font weight
      fontWeight: 500,
      // 图例项间距 / Margin between legend items
      itemMargin: { horizontal: 8, vertical: 8 },
      // 标签颜色 / Label colors
      labels: { colors: themeVars.colors.text.primary }
    },

    /**
     * 各类图表特定配置
     * Plot options for different chart types
     */
    plotOptions: {
      // 柱状图配置 / Bar chart configuration
      bar: {
        // 圆角 / Border radius
        borderRadius: 4,
        // 柱宽 / Column width
        columnWidth: '48%',
        // 圆角应用方式 / How border radius is applied
        borderRadiusApplication: 'end'
      },

      // 饼图和环形图配置 / Pie and Donut chart configuration
      pie: {
        donut: {
          labels: {
            // 显示数值标签 / Show value labels
            show: true,
            // 数值标签样式 / Value label configuration
            value: { ...LABEL_VALUE },
            // 总数标签样式 / Total label configuration
            total: { ...LABEL_TOTAL }
          }
        }
      },

      // 径向环图配置 / RadialBar chart configuration
      radialBar: {
        // 中空部分 / Hollow configuration
        hollow: { margin: -8, size: '100%' },
        // 轨道配置 / Track configuration
        track: {
          margin: -8,
          strokeWidth: '50%',
          // 背景颜色 / Background color
          background: rgbAlpha(themeVars.colors.palette.gray[500], 0.5)
        },
        // 数据标签 / Data labels
        dataLabels: {
          value: { ...LABEL_VALUE },
          total: { ...LABEL_TOTAL }
        }
      },

      // 雷达图配置 / Radar chart configuration
      radar: {
        polygons: {
          // 多边形填充颜色 / Polygon fill colors
          fill: { colors: ['transparent'] },
          // 多边形边框颜色 / Polygon stroke colors
          strokeColors: themeVars.colors.background.neutral,
          // 多边形连接线颜色 / Connector colors
          connectorColors: themeVars.colors.background.neutral
        }
      },

      // 极地区域图配置 / PolarArea chart configuration
      polarArea: {
        rings: {
          // 圆环边框颜色 / Ring stroke color
          strokeColor: themeVars.colors.background.neutral
        },
        spokes: {
          // 连接线颜色 / Spoke connector colors
          connectorColors: themeVars.colors.background.neutral
        }
      }
    },

    /**
     * 响应式配置
     * Responsive configuration for different breakpoints
     */
    responsive: [
      {
        // 小屏幕断点 / Small screen breakpoint
        breakpoint: removePx(breakpointsTokens.sm),
        options: {
          // 小屏柱状图配置 / Bar chart options for small screens
          plotOptions: {
            bar: {
              // 柱宽 / Column width
              columnWidth: '80%',
              // 圆角 / Border radius
              borderRadius: 3
            }
          }
        }
      },
      {
        // 中屏幕断点 / Medium screen breakpoint
        breakpoint: removePx(breakpointsTokens.md),
        options: {
          // 中屏柱状图配置 / Bar chart options for medium screens
          plotOptions: {
            bar: {
              // 柱宽 / Column width
              columnWidth: '62%'
            }
          }
        }
      }
    ]
  };
};

/**
 * 图表配置 Hook
 * Chart configuration hook
 *
 * 用于生成 ApexCharts 的最终配置：
 * - 合并默认主题配置（baseOptions）
 * - 覆盖用户自定义配置（options）
 *
 * Used to generate final ApexCharts config:
 * - Merge default theme options (baseOptions)
 * - Override with user custom options (options)
 */
export function useChart(options: ApexOptions) {
  /** 获取主题配置（主题色、明暗模式） / Get theme settings (color presets and mode) */
  const { themeColorPresets, themeMode } = useSettingStoreState();

  /** 生成基础图表配置 / Generate base chart options */
  const baseOptions = baseChartOptions(themeColorPresets, themeMode);

  /** 深度合并配置（用户配置优先） / Deep merge options (user options take priority) */
  return mergeDeepRight(baseOptions, options) as ApexOptions;
}
