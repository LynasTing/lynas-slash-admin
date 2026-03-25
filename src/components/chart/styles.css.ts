import { style, globalStyle } from '@vanilla-extract/css';
import { themeVars } from '@/theme/theme.css';
import { rgbAlpha } from '@/utils';

/**
 * 图表包裹容器样式
 *
 * `style()` 函数用来生成一个唯一的 CSS 类名，接受两个参数：
 *
 * 1. **第一个参数**是一个样式对象，包含标准的 CSS 属性和值。
 *    这些属性和值最终会转换为生成的 CSS 样式。
 *    例如：
 *    - `backgroundColor: 'blue'` 会转化成 `background-color: blue;`
 *    - `color: 'white'` 会转化成 `color: white;`
 *    - `padding: '10px 20px'` 会转化成 `padding: 10px 20px;`
 *
 *    注意：样式对象中的属性名会自动转换为小写，并且遵循标准的 CSS 命名规则（例如 `backgroundColor` 会变成 `background-color`）。
 *
 * 2. **第二个参数**是可选的，用来指定生成的类名前缀。
 *    这样可以让你更容易地识别样式属于哪个组件或模块，避免类名冲突。
 *    - 比如，传入 `'apexcharts-wrapper'` 后，生成的类名会以该字符串为前缀，例如 `apexcharts-wrapper_1mC2fr`。
 *    - 如果不传第二个参数，Vanilla Extract 会自动生成一个随机的类名。
 *
 * 3. **返回值**：`style()` 会返回一个类名，代表这些样式。
 *    你可以把它应用到 DOM 元素上，最终生成的样式会生效。
 *    - 这个类名是唯一的，并且会随着样式对象和前缀（如果有）一起生成。
 *    - 这样做可以确保不同组件的样式不会冲突，特别是在多个地方都使用 `style()` 时。
 *
 *  * Chart Wrapper Style
 *
 * The `style()` function generates a unique CSS class name and takes two parameters:
 *
 * 1. **The first parameter** is a style object containing standard CSS properties and values.
 *    These properties and values will be converted into the resulting CSS styles.
 *    For example:
 *    - `backgroundColor: 'blue'` becomes `background-color: blue;`
 *    - `color: 'white'` becomes `color: white;`
 *    - `padding: '10px 20px'` becomes `padding: 10px 20px;`
 *
 *    Note: Property names in the style object are automatically converted to lowercase and follow standard CSS naming conventions (e.g., `backgroundColor` becomes `background-color`).
 *
 * 2. **The second parameter** is optional and specifies a prefix for the generated class name.
 *    This helps you identify which component or module the style belongs to and avoids class name conflicts.
 *    - For example, if you pass `'apexcharts-wrapper'`, the generated class name will start with that string, like `apexcharts-wrapper_1mC2fr`.
 *    - If you don't provide the second parameter, Vanilla Extract will automatically generate a random class name.
 *
 * 3. **Return value**: `style()` returns a class name representing these styles.
 *    You can apply this class name to a DOM element, and the resulting styles will take effect.
 *    - This class name is unique and is generated based on the style object and the prefix (if any).
 *    - This ensures that styles from different components don't conflict, especially when multiple instances of `style()` are used.
 */
export const chartWrapper = style({}, 'apexcharts-wrapper');

/**
 * tooltip 整体样式
 *
 * `globalStyle()` 函数详解：
 *
 * 1. **作用**：
 *    `globalStyle()` 用于为全局选择器设置样式，它的样式会直接作用到页面上的所有匹配元素。与 `style()` 不同，`globalStyle()` 不返回类名，而是直接修改匹配元素的样式。
 *    - **用途**：适用于需要全局生效的样式，例如页面整体的样式、第三方组件的样式覆盖，或者伪类、伪元素的样式等。
 *
 * 2. **参数**：
 *    - **第一个参数**：选择器字符串（`selector`），用来匹配你想应用样式的元素。可以是类选择器、ID 选择器、后代选择器、伪类、伪元素等。
 *    - **第二个参数**：一个样式对象，包含标准的 CSS 属性和值。样式对象中的属性名会被自动转换为符合 CSS 规范的格式。
 *
 * 3. **与 `style()` 的区别**：
 *    - `style()` 是局部样式，它会返回一个类名，样式会应用到具体的组件元素中。
 *    - `globalStyle()` 是全局样式，直接应用到页面上的匹配元素，不返回类名。
 *
 * 4. **使用场景**：
 *    - 为全局元素（如 `body`、`html`）设置样式。
 *    - 覆盖第三方库的默认样式。
 *    - 设置伪类（例如 `::before`、`::after`）或伪元素的样式。
 *    - 需要确保样式应用到多个组件或者元素时，使用 `globalStyle` 更加合适。
 *
 * 5. **例子**：
 *    - 设置页面的 `body` 样式，移除默认的内边距和边距。
 *    - 设置 `.button` 按钮的全局样式。
 *    - 覆盖第三方组件的工具提示框（`apexcharts-tooltip`）样式。
 *
 * tooltip style
 *
 * **`globalStyle()` function detailed explanation**:
 *
 * 1. **Functionality**:
 *    `globalStyle()` is used to set styles for global selectors, and its styles directly affect all matching elements on the page. Unlike `style()`, `globalStyle()` does not return class names but directly modifies the styles of the matching elements.
 *    - **Usage**: It is suitable for styles that need to be applied globally, such as page-wide styles, overriding default styles from third-party components, or styling pseudo-classes and pseudo-elements.
 *
 * 2. **Parameters**:
 *    - **First parameter**: A selector string (`selector`) that matches the elements you want to apply styles to. It can be a class selector, an ID selector, a descendant selector, pseudo-classes, pseudo-elements, etc.
 *    - **Second parameter**: A style object containing standard CSS properties and values. Property names in the object will be automatically converted to conform to CSS syntax.
 *
 * 3. **Difference from `style()`**:
 *    - `style()` is for local styles, which returns a class name and applies styles to specific component elements.
 *    - `globalStyle()` is for global styles, which directly apply to matching elements on the page and does not return a class name.
 *
 * 4. **Use cases**:
 *    - Set styles for global elements like `body`, `html`.
 *    - Override default styles from third-party libraries.
 *    - Style pseudo-classes (e.g., `::before`, `::after`) or pseudo-elements.
 *    - If you need to ensure that styles are applied to multiple components or elements, `globalStyle` is more suitable.
 *
 * 5. **Examples**:
 *    - Set styles for the `body` element, removing default padding and margin.
 *    - Set global styles for `.button` elements.
 *    - Override styles for a third-party component's tooltip (`apexcharts-tooltip`).
 */
globalStyle(`${chartWrapper} .apexcharts-tooltip`, {
  color: themeVars.colors.text.primary,
  borderRadius: themeVars.borderRadius.lg,
  backdropFilter: 'blur(6px)',
  backgroundColor: rgbAlpha(themeVars.colors.background.paperChannel, 0.8),
  boxShadow: themeVars.shadows.card
});

/**
 * tooltip 标题
 * tooltip title
 */
globalStyle(`${chartWrapper} .apexcharts-tooltip-title`, {
  textAlign: 'center',
  fontWeight: 'bold',
  backgroundColor: themeVars.colors.background.neutral
});

/**
 * x 轴 tooltip
 * x-axis tooltip
 */
globalStyle(`${chartWrapper} .apexcharts-xaxistooltip`, {
  color: themeVars.colors.text.primary,
  borderRadius: themeVars.borderRadius.lg,
  backdropFilter: 'blur(6px)',
  borderColor: 'transparent',
  boxShadow: themeVars.shadows.card,
  backgroundColor: themeVars.colors.background.paper
});

/**
 * x 轴 tooltip before
 * x-axis tooltip before
 */
globalStyle(`${chartWrapper} .apexcharts-xaxistooltip::before`, {
  borderBottomColor: rgbAlpha(themeVars.colors.background.paperChannel, 0.8)
});

/**
 * x 轴 tooltip after
 * x-axis tooltip after
 */
globalStyle(`${chartWrapper} .apexcharts-xaxistooltip::after`, {
  borderBottomColor: themeVars.colors.background.paper
});

/**
 * 图例
 * legend
 */
globalStyle(`${chartWrapper} .apexcharts-legend`, {
  padding: 0
});

/**
 * 图例 item
 * legend item
 */
globalStyle(`${chartWrapper} .apexcharts-legend-series`, {
  display: 'inline-flex !important',
  alignItems: 'center'
});

/**
 * 图例文本
 * legend text
 */
globalStyle(`${chartWrapper} .apexcharts-legend-text`, {
  lineHeight: '18px',
  textTransform: 'capitalize'
});
