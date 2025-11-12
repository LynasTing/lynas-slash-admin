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
