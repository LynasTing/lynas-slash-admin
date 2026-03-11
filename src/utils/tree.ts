type TreeNode<T> = T & { children: TreeNode<T>[] };

/**
 * 将一个扁平的数组通过 parentId 转换成树形结构
 * Convert a flat array with parentId to a tree structure
 *
 * @param items 扁平数组 Flat array
 * @returns 树形结构 Tree
 */
export function convertFlatToTree<T extends { id: string; parentId: string }>(items: T[]): TreeNode<T>[] {
  /**
   * 用 Map 快速通过 id 找到节点
   * Use Map to quickly find nodes through id
   */
  const idToNodeMap = new Map<string, TreeNode<T>>();

  /**
   * 初始化节点，给每个节点加上空 children
   * Initialize nodes, add empty children to each node
   */
  for (const item of items) {
    idToNodeMap.set(item.id, {
      ...item,
      children: []
    });
  }

  /**
   * 最终结果
   * Final result
   */
  const tree: TreeNode<T>[] = [];

  for (const item of items) {
    const node = idToNodeMap.get(item.id)!;
    /**
     * 没有 parentId，属于顶层节点
     * No parentId, top-level node
     */
    if (!item.parentId) {
      tree.push(node);
    } else {
      const parent = idToNodeMap.get(item.parentId);
      if (parent) parent.children.push(node);
    }
  }
  return tree;
}

/**
 * 将树形结构拍平成一维数组
 * Flatten a tree structure into a flat array
 *
 * 例如：
 * Example:
 *
 * 示例 Example:
 * 输入 Input: [{ id: 1, children: [{ id: 2 }] }]
 * 输出 Output: [{ id: 1 }, { id: 2 }]
 *
 * @param tree 树形结构数组 Tree structure array
 * @returns 扁平数组 Flattened array
 */
export function flattenTree<T extends { children?: T[] }>(tree: T[] = []): T[] {
  /**
   * 使用 flatMap 遍历每个节点
   * Use flatMap to iterate through each node
   */
  return tree.flatMap(node => [
    /**
     * 当前节点本身
     * Current node itself
     */
    node,

    /**
     * 递归展开 children
     * Recursively flatten children
     */
    ...flattenTree(node.children ?? [])
  ]);
}
