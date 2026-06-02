import Button from '@/ui/button';
import { themeVars } from '@/theme/theme.css';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { ScrollArea, ScrollBar } from '@/ui/scroll-area';
import { faker } from '@faker-js/faker';

const text = faker.lorem.paragraphs({ min: 20, max: 30 });

export default function ScrollBarView() {
  return (
    <>
      <Button variant="link" asChild>
        <a
          href="https://grsmto.github.io/simplebar/"
          className="mb-4 block"
          style={{
            color: themeVars.colors.palette.primary.default
          }}>
          https://grsmto.github.io/simplebar
        </a>
      </Button>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vertical</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[420px]">{text}</ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>horizontal</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full pb-2">
              <div style={{ width: '200%' }}>{text}</div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
