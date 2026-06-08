import { Card, CardHeader, CardContent } from '@/ui/card';
import Toolbar from '../shared/toolbar';
import type { VariantType } from '@/components/animate/variants';
import { useState } from 'react';
import ControlPanel, { type VariantKeysType } from '../shared/control-panel';
import BackgroundContainer from './container';

/**
 * 背景动画分为图片变换和背景色变换两类，渲染节点需要按类型区分。
 * Background variants include image transforms and color transitions, so rendering differs by variant type.
 */
const variantKeys = [
  {
    type: 'kenburns',
    values: ['kenburnsTop', 'kenburnsBottom', 'kenburnsLeft', 'kenburnsRight']
  },
  {
    type: 'pan',
    values: ['panTop', 'panBottom', 'panLeft', 'panRight']
  },
  {
    type: 'color change',
    values: ['color2x', 'color3x', 'color4x', 'color5x']
  }
] as const satisfies readonly VariantKeysType[];

const defaultVariant: VariantType = 'kenburnsTop';

export default function Background() {
  const [selectedVariant, setSelectedVariant] = useState<VariantType>(defaultVariant);

  return (
    <Card>
      <CardHeader>
        <Toolbar onRefresh={() => setSelectedVariant(defaultVariant)} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-3">
            <BackgroundContainer variant={selectedVariant} />
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
