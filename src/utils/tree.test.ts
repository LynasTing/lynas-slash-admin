import { describe, expect, it } from 'vitest';
import { convertFlatToTree, flattenTree } from './tree';

/**
 * 这份文件测试不依赖 React 或浏览器 API 的纯数据函数，所以 Vitest 使用默认的 Node 环境即可。
 * 纯函数测试应优先覆盖：给定输入是否产生预期输出，以及函数是否意外修改调用方数据。
 *
 * This file tests pure data functions that do not depend on React or browser APIs, so Vitest's default Node environment is sufficient.
 * Pure-function tests should first verify expected output for a given input and whether the function accidentally mutates caller-owned data.
 */
type MenuNode = {
  /**
   * 节点唯一标识，用于建立父子关系。
   * Unique node identifier used to build parent-child relationships.
   */
  id: string;

  /**
   * 父节点标识；空字符串代表根节点。
   * Parent identifier; an empty string represents a root node.
   */
  parentId: string;

  /**
   * 仅用于让断言中的测试数据更容易阅读。
   * Used only to make fixture data in assertions easier to read.
   */
  name: string;
};

/**
 * 测试夹具同时包含两个根节点、同级节点和第三层节点。
 * 一组数据覆盖多种层级关系，避免每个测试都手写无关数据而掩盖测试意图。
 *
 * The fixture contains two roots, sibling nodes, and a third-level node.
 * One fixture covers several hierarchy cases, preventing each test from repeating incidental data and obscuring its intent.
 */
const flatMenuNodes: MenuNode[] = [
  { id: 'dashboard', parentId: '', name: 'Dashboard' },
  { id: 'workbench', parentId: 'dashboard', name: 'Workbench' },
  { id: 'analysis', parentId: 'dashboard', name: 'Analysis' },
  { id: 'traffic', parentId: 'analysis', name: 'Traffic' },
  { id: 'settings', parentId: '', name: 'Settings' }
];

describe('convertFlatToTree', () => {
  it('builds a nested tree and preserves sibling order', () => {
    /**
     * 调用被测函数只做一次；下面的断言直接描述调用方真正需要的完整树结构。
     * `toEqual` 会递归比较值，因此父子归属、层级深度、children 初始化和同级顺序出现回归都会失败。
     *
     * Call the function under test once; the assertion below describes the complete tree structure required by callers.
     * `toEqual` compares values recursively, so regressions in parent-child ownership, depth, children initialization, or sibling order fail this test.
     */
    const tree = convertFlatToTree(flatMenuNodes);

    expect(tree).toEqual([
      {
        id: 'dashboard',
        parentId: '',
        name: 'Dashboard',
        children: [
          {
            id: 'workbench',
            parentId: 'dashboard',
            name: 'Workbench',
            children: []
          },
          {
            id: 'analysis',
            parentId: 'dashboard',
            name: 'Analysis',
            children: [
              {
                id: 'traffic',
                parentId: 'analysis',
                name: 'Traffic',
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 'settings',
        parentId: '',
        name: 'Settings',
        children: []
      }
    ]);
  });

  it('does not mutate the source records while adding children', () => {
    /**
     * 真实调用方可能复用原始扁平数组，例如用于列表、缓存或再次转换。
     * 因此除了验证树结果，还要验证函数没有给原对象直接添加 children 或替换字段。
     *
     * Real callers may reuse the original flat array for lists, caches, or another conversion.
     * Besides checking the tree result, verify that the function does not add children to the original objects or replace their fields.
     */
    const source = [
      { id: 'root', parentId: '', name: 'Root' },
      { id: 'child', parentId: 'root', name: 'Child' }
    ];

    const tree = convertFlatToTree(source);

    /**
     * 原始值保持不变，证明没有发生可观察的数据污染。
     * The original values remain unchanged, proving that no observable data pollution occurred.
     */
    expect(source).toEqual([
      { id: 'root', parentId: '', name: 'Root' },
      { id: 'child', parentId: 'root', name: 'Child' }
    ]);
    /**
     * 引用不同，进一步证明树节点是新对象；仅比较值相等无法捕获“原对象被复用”的问题。
     *
     * A distinct reference further proves tree nodes are new objects; value equality alone cannot catch reuse of the original object.
     */
    expect(tree[0]).not.toBe(source[0]);
  });

  it('returns an empty tree for empty input', () => {
    /**
     * 空数据是接口首次加载、筛选无结果等场景的正常输入，不应要求调用方额外判断。
     *
     * Empty data is normal for initial API loads and empty filter results, so callers should not need an extra guard.
     */
    expect(convertFlatToTree([])).toEqual([]);
  });
});

describe('flattenTree', () => {
  it('returns nodes in depth-first pre-order', () => {
    /**
     * 先复用已知树结构，再只比较 id 序列。这样断言聚焦“展开顺序”，而不会重复验证每个节点的全部字段。
     * 期望顺序为：父节点 → 第一个子树 → 下一个同级节点 → 下一个根节点。
     *
     * Reuse the known tree and compare only ids, keeping this assertion focused on traversal order rather than every node field.
     * The expected order is: parent → first subtree → next sibling → next root.
     */
    const tree = convertFlatToTree(flatMenuNodes);

    expect(flattenTree(tree).map(node => node.id)).toEqual(['dashboard', 'workbench', 'analysis', 'traffic', 'settings']);
  });

  it('accepts an omitted tree', () => {
    /**
     * flattenTree 为参数定义了默认空数组；这个测试把该 API 约定固定下来，避免以后移除默认值造成调用方运行时错误。
     *
     * flattenTree defines an empty-array default parameter; this test locks that API contract and prevents a future removal from causing caller runtime errors.
     */
    expect(flattenTree()).toEqual([]);
  });
});
