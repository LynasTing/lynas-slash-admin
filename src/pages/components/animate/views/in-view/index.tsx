import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/ui/card';
import Toolbar from '../shared/toolbar';
import { Switch } from '@/ui/switch';
import InViewContainer, { type InViewContainerProps } from './container';
import ControlPanel, { type VariantKeysType } from '../shared/control-panel';

/**
 * 视口动画完整展示入场和离场 variant，便于对比同类动画的两个方向。
 * The in-view demo exposes both enter and exit variants for side-by-side behavior comparison.
 */
const variantKeys = [
  {
    type: 'slide in',
    values: ['slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight']
  },
  {
    type: 'slide out',
    values: ['slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight']
  },
  {
    type: 'fade in',
    values: ['fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight']
  },
  {
    type: 'fade out',
    values: ['fadeOut', 'fadeOutUp', 'fadeOutDown', 'fadeOutLeft', 'fadeOutRight']
  },
  {
    type: 'zoom in',
    values: ['zoomIn', 'zoomInUp', 'zoomInDown', 'zoomInLeft', 'zoomInRight']
  },
  {
    type: 'zoom out',
    values: ['zoomOut', 'zoomOutUp', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight']
  },
  {
    type: 'bounce in',
    values: ['bounceIn', 'bounceInUp', 'bounceInDown', 'bounceInLeft', 'bounceInRight']
  },
  {
    type: 'bounce out',
    values: ['bounceOut', 'bounceOutUp', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight']
  },
  {
    type: 'flip in',
    values: ['flipInX', 'flipInY']
  },
  {
    type: 'flip out',
    values: ['flipOutX', 'flipOutY']
  },
  {
    type: 'scale in',
    values: ['scaleInX', 'scaleInY']
  },
  {
    type: 'scale out',
    values: ['scaleOutX', 'scaleOutY']
  },
  {
    type: 'rotate in',
    values: ['rotateIn']
  },
  {
    type: 'rotate out',
    values: ['rotateOut']
  }
] as const satisfies readonly VariantKeysType[];

/**
 * 刷新按钮回到这组默认状态，避免多个开关和动画选择各自维护默认值。
 * The refresh action returns to this single default state so toggles and variant selection do not drift apart.
 */
const defaultValue: InViewContainerProps = {
  isText: false,
  isMulti: false,
  variant: 'slideInUp'
};

export default function InView() {
  const [isText, setIsText] = useState(defaultValue.isText);
  const [isMulti, setIsMulti] = useState(defaultValue.isMulti);
  const [selectedVariant, setSelectedVariant] = useState(defaultValue.variant);

  const handleRefresh = () => {
    /**
     * 多个状态必须一起回滚，否则示例内容和控制面板选中项会出现不一致。
     * These states reset together to keep the preview content and selected control panel item in sync.
     */
    setIsText(defaultValue.isText);
    setIsMulti(defaultValue.isMulti);
    setSelectedVariant(defaultValue.variant);
  };

  return (
    <Card>
      <CardHeader>
        <Toolbar onRefresh={handleRefresh}>
          <div className="flex flex-1 justify-between pr-4 whitespace-nowrap md:pr-96">
            <div className="flex items-center gap-x-2">
              <Switch checked={isText} onCheckedChange={() => setIsText(!isText)} />
              <span>Text Object</span>
            </div>
            {!isText ? (
              <div className="flex items-center gap-x-2">
                <Switch checked={isMulti} onCheckedChange={() => setIsMulti(!isMulti)} />
                <span>Multi Item</span>
              </div>
            ) : null}
          </div>
        </Toolbar>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex-3">
            <InViewContainer isText={isText} isMulti={isMulti} variant={selectedVariant} />
          </div>
          <div className="flex-1">
            <ControlPanel
              variantKeys={variantKeys}
              selectedVariant={selectedVariant}
              onChangeVariant={value => setSelectedVariant(value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
