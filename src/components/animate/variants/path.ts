/**
 * SVG Path 动画 Variants
 * SVG Path animation variants
 *
 * 用于控制 SVG <path> 的绘制与填充动画。
 * Used to control the drawing and filling animation of an SVG <path>.
 */
export const varPath = {
  /**
   * 动画执行状态
   * Animation state
   */
  animate: {
    /**
     * 填充透明度关键帧
     * Fill opacity keyframes
     *
     * 在路径绘制完成后再显示填充颜色。
     * The fill appears after the path drawing finishes.
     */
    fillOpacity: [0, 0, 1],

    /**
     * 路径长度关键帧
     * Path length keyframes
     *
     * 控制 SVG 路径的绘制比例变化。
     * Controls the visible drawing portion of the path.
     */
    pathLength: [1, 0.4, 0],

    /**
     * 动画过渡配置
     * Animation transition configuration
     */
    transition: {
      /**
       * 动画持续时间（秒）
       * Animation duration in seconds
       */
      duration: 2,

      /**
       * 自定义缓动曲线（cubic-bezier）
       * Custom easing curve
       */
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};
