import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFilteredNavData } from '../app/nav/nav-data';
import { useBoolean } from 'react-use';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import { CommandDialog, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/ui/command';
import { ScrollArea } from '@/ui/scroll-area';
import useLocale from '@/locales/use-locale';
import { useNavigate } from 'react-router';
import { Badge } from '@/ui/badge';
import HighlightText from '@/components/high-light-text';
import { Text } from '@/ui/typography';

/**
 * 搜索结果项结构
 * Search result item structure
 */
interface SearchItem {
  /** 唯一标识（通常直接用路由） / Unique identifier (usually the route) */
  key: string;
  /** 显示的文本 / Displayed text */
  label: string;
  /** 跳转路径 / Navigation path */
  path: string;
}

const SearchBar = () => {
  /** 过滤后的导航数据 / Filtered navigation tree */
  const navData = useFilteredNavData();

  /** Command Dialog 是否打开 / Dialog open state */
  const [open, setOpen] = useBoolean(false);

  /** 当前搜索关键字 / Current search keyword */
  const [searchQuery, setSearchQuery] = useState('');

  /** 国际化函数 / i18n translate function */
  const { t } = useLocale();

  /** 路由跳转方法 / Router navigation */
  const navigate = useNavigate();

  /**
   * 扁平化导航数据
   * Flatten nested navigation into a searchable list
   */
  const flattendItems = useMemo(() => {
    const items: SearchItem[] = [];

    /**
     * 递归拍平导航树
     * Recursively flatten nav tree
     */
    const flattenItems = (navItems: typeof navData) => {
      for (const section of navItems) {
        for (const item of section.items) {
          // 有 path 才是可跳转项 / Only items with path are valid
          if (item.path) {
            items.push({
              key: item.path,
              label: item.title,
              path: item.path
            });
          }

          // 继续处理子节点 / Handle children recursively
          if (item.children?.length) {
            flattenItems([{ items: item.children }]);
          }
        }
      }
    };

    flattenItems(navData);
    return items;
  }, [navData]);

  /**
   * 注册全局快捷键 ⌘/Ctrl + K
   * Register global shortcut ⌘/Ctrl + K
   */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // 判断是否按下 ⌘/Ctrl + K / Check ⌘/Ctrl + K
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        // 禁用浏览器默认行为 / Prevent browser default
        e.preventDefault();

        // 函数式更新，保证状态不翻车 / Functional update to avoid stale state
        setOpen((open: boolean) => !open);
      }
    };

    // 注册监听 / Add listener
    document.addEventListener('keydown', down);

    // 卸载监听 / Cleanup listener
    return () => document.removeEventListener('keydown', down);
  });

  /**
   * 选择搜索项后的行为
   * Handle command item selection
   */
  const handleSelect = useCallback(
    (path: string) => {
      // 跳转路由并替换历史 / Navigate and replace history
      navigate(path, { replace: true });

      // 关闭搜索框 / Close dialog
      setOpen(false);
    },
    [navigate, setOpen]
  );

  return (
    <>
      <Button variant="ghost" className="px-2 bg-action-selected rounded-lg" size="sm">
        <div className="flex justify-center items-center gap-4">
          <Icon icon="local:ic-search" size="20" />
          {/* 快捷键提示 / Shortcut hint */}
          <kbd className="flex justify-center items-center rounded-md bg-primary/80 text-common-white px-1.5 py-0.5 txt-sm font-semibold">
            <Icon icon="qlementine-icons:key-cmd-16" />
            <span>K</span>
          </kbd>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." value={searchQuery} onValueChange={setSearchQuery} />
        <ScrollArea className="h-[400px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigations">
            {flattendItems.map(({ key, label }) => (
              <CommandItem key={key} className="flex flex-col items-start" onSelect={() => handleSelect(key)}>
                <div className="font-medium">
                  <HighlightText text={t(label)} query={searchQuery} />
                </div>
                <div className="text-xs text-muted-foreground">
                  <HighlightText text={label} query={searchQuery} />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </ScrollArea>

        <CommandSeparator />

        {/* 底部快捷键说明 / Footer shortcuts */}
        <div className="flex flex-wrap justify-end p-2 text-text-primary gap-2">
          <div className="flex items-center gap-1">
            <Badge variant="info">↑</Badge>
            <Badge variant="info">↓</Badge>
            <Text variant="caption">to navigate</Text>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="info">↵</Badge>
            <Text variant="caption">to select</Text>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="info">ESC</Badge>
            <Text variant="caption">to close</Text>
          </div>
        </div>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
