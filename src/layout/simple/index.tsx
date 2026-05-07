import React from 'react';
import HeaderSimple from '../components/header-simple';

/**
 * SimpleLayout 组件
 *
 * 一个简单的布局组件，用于展示页面的基础结构，包括固定的头部和动态插入的主内容部分
 * SimpleLayout is a simple layout component that provides the basic structure of a page, including a fixed header and dynamic main content
 */
export default function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen text-text-base bg-bg">
      <HeaderSimple />
      {children}
    </div>
  );
}
