import { type Props as ApexChartProps } from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';
import { chartWrapper } from './styles.css';

export function Chart(props: ApexChartProps) {
  return (
    <div className={chartWrapper}>
      <ReactApexChart
        {...props}
        options={{
          ...props,
          chart: {
            ...props.options?.chart,
            // 优化响应式性能 / Performance optimization
            animations: {
              ...props.options?.chart?.animations,
              // 启用动画 / Enable animations
              enabled: true,
              // 减少动画时间 / Reduce animation time
              speed: 200,
              animateGradually: {
                // 禁用渐进式动画
                enabled: false
              },
              dynamicAnimation: {
                enabled: true,
                // 减少动态动画时间
                speed: 200
              }
            },
            // 启用硬件加速
            redrawOnParentResize: true,
            redrawOnWindowResize: true
          }
        }}
      />
    </div>
  );
}
