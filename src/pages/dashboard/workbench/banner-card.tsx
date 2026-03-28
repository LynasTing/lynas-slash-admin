import type { CSSProperties } from 'react';
import bgIMG from '@/assets/images/background/banner_1.png';
import { Title, Text } from '@/ui/typography';
import { GLOBAL_CONFIG } from '@/config/global';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import Character3IMG from '@/assets/images/characters/character_3.png';

export default function BannerCard() {
  const bgStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    /**
     * 当通过 JS 将 SVG 的 URL 传递给 url() 的手动构造函数，变量应该用双引号包裹
     * When passing a URL of SVG to a manually constructed url() by JS, the variable should be wrapped within double quotes.
     *
     * @see https://vite.dev/guide/assets.html
     */
    backgroundImage: `url("${bgIMG}")`,
    backgroundSize: '100%',
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
    opacity: 0.5
  };
  return (
    <div className="relative bg-primary/90">
      {/* 1. 内容区域（文本和按钮） / Content Area(Text and Button) */}
      <div className="relative p-6 z-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            {/* 标题和描述 / Title and Description */}
            <div className="flex flex-col gap-4">
              <Title as="h2" className="text-white">
                Explore Redesigned {GLOBAL_CONFIG.appName}
              </Title>
              <Text className="text-white">
                The rand new User Interface with power of Shadcn/ui Components. Explore the Endless possibilities with{' '}
                {GLOBAL_CONFIG.appName}.
              </Text>
              {/* 按钮 / Button */}
              <Button>
                <Icon icon="carbon:logo-discord" size={24} />
                <span className="ml-2 font-black ">Join Discord</span>
              </Button>
            </div>
          </div>
          {/* 右侧图片 / Character */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex justify-end items-center w-full h-full">
              <img src={Character3IMG} className="w-56 h-56" alt="character" />
            </div>
          </div>
        </div>
      </div>
      {/* 2.背景图 / Mask */}
      <div className="z-1" style={bgStyle} />
    </div>
  );
}
