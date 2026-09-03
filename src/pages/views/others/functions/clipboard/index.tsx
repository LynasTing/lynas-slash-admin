import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Card, CardContent } from '@/ui/card';
import { Input } from '@/ui/input';
import { useState, type ChangeEvent } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/ui/tooltip';
import Button from '@/ui/button';
import { Icon } from '@/components/icon';
import { faker } from '@faker-js/faker';
import useLocale from '@/locales/use-locale';

export default function ClipboardPage() {
  const { copyFn } = useCopyToClipboard();
  const { t } = useLocale();
  const [value, setValue] = useState('https://www.npmjs.com/package/');

  /**
   * 输入框回调
   * Input change callback
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  /** 生成随机段落 / Generate random paragraph */
  const paragraph = faker.lorem.paragraphs({ min: 3, max: 5 });

  return (
    <Card>
      <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <h5 className="mb-2 font-medium">{t('ui.functions.onChange')}</h5>
          <div className="flex items-center gap-2">
            <Input value={value} onChange={handleInputChange} />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => copyFn(value)}>
                  <Icon icon="eva:copy-fill" size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t('ui.functions.copy')}</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div>
          <h5 className="mb-2 font-semibold">{t('ui.functions.onDoubleClick')}</h5>
          <div onDoubleClick={() => copyFn(paragraph)}>{paragraph}</div>
        </div>
      </CardContent>
    </Card>
  );
}
