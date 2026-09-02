import { useState } from 'react';
import Toolbar from '../shared/toolbar';
import ControlPanel, { type VariantKeysType } from '../shared/control-panel';
import { Card, CardHeader, CardContent } from '@/ui/card';
import type { VariantType } from '@/components/animate/variants';
import ScrollContainer from './container';
import useLocale from '@/locales/use-locale';

const ANIMATE_PAGE_I18N_PREFIX = 'pages.components.animate';

/**
 * 滚动触发动画只展示入场类 variant，避免列表滚动时出现离场动画造成理解干扰。
 * The scroll demo only exposes enter variants to avoid exit animations making viewport behavior harder to read.
 */
const variantKeys = [
  {
    type: 'slide',
    values: ['slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight']
  },
  {
    type: 'fade',
    values: ['fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight']
  },
  {
    type: 'zoom',
    values: ['zoomIn', 'zoomInUp', 'zoomInDown', 'zoomInLeft', 'zoomInRight']
  },
  {
    type: 'bounce',
    values: ['bounceIn', 'bounceInUp', 'bounceInDown', 'bounceInLeft', 'bounceInRight']
  },
  {
    type: 'flip',
    values: ['flipInX', 'flipInY']
  },
  {
    type: 'scale',
    values: ['scaleInX', 'scaleInY']
  },
  {
    type: 'rotate',
    values: ['rotateIn']
  }
] as const satisfies readonly VariantKeysType[];

const defaultVariant: VariantType = 'slideInUp';

export default function Scroll() {
  const { t } = useLocale();
  const [selectedVariant, setSelectedVariant] = useState<VariantType>(defaultVariant);

  return (
    <Card>
      <CardHeader>
        <Toolbar onRefresh={() => setSelectedVariant(defaultVariant)} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-3">
            <ScrollContainer variant={selectedVariant} />
          </div>
          <div className="flex-1">
            <ControlPanel
              variantKeys={variantKeys}
              selectedVariant={selectedVariant}
              getGroupLabel={type => t(`${ANIMATE_PAGE_I18N_PREFIX}.groups.${type}`)}
              getVariantLabel={variant => t(`${ANIMATE_PAGE_I18N_PREFIX}.variants.${variant}`)}
              onChangeVariant={value => setSelectedVariant(value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
