/**
 * 高亮文本组件
 * HighlightText
 */
const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <>{text}</>;

  /**
   * 将原始文本按“关键词”拆分成数组，用于后续高亮渲染
   *
   * 中文说明：
   * - 使用 RegExp 动态生成正则：(${query})
   *   - () 是“捕获分组”，作用是：在 split 时【保留关键词本身】
   *   - g 表示全局匹配，匹配所有出现的位置
   *   - i 表示忽略大小写，query 大小写不一致也能命中
   * - String.prototype.split 在遇到【带捕获分组的正则】时：
   *   - 会把普通文本切开
   *   - 并把每一次匹配到的关键词，原样插回结果数组
   *
   * 示例（Example）：
   * text  = "学习前端开发真的很爽，前端工程师需求很大"
   * query = "前端"
   *
   * 实际执行：
   * text.split(/(前端)/gi)
   *
   * 返回结果（parts）：
   * [
   *   "学习",
   *   "前端",
   *   "开发真的很爽，",
   *   "前端",
   *   "工程师需求很大"
   * ]
   *
   * 这样数组中：
   * - 普通文本片段可以直接渲染
   * - 等于 query 的片段可以单独包一层 <span> 做高亮
   *
   * English explanation:
   * - A dynamic RegExp is created using (${query})
   * - The parentheses create a capturing group, which makes split KEEP the matched keyword
   * - The 'g' flag matches all occurrences
   * - The 'i' flag ignores case differences
   * - When split is used with a capturing group, matched substrings are included in the result array
   */
  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLocaleLowerCase() === query.toLocaleLowerCase() ? (
          <span key={i} className="text-primary">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

export default HighlightText;
