import Button from '@/ui/button';
import { themeVars } from '@/theme/theme.css';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import { faker } from '@faker-js/faker';
import { ScrollProgress, useScrollProgress } from '@/components/animate/scroll-progress';

const text = faker.lorem.paragraphs({ min: 20, max: 30 });

export default function ScrollProgressView() {
  const { elementRef, scrollYProgress } = useScrollProgress('container');

  return (
    <>
      <Button variant="link" asChild>
        <a
          href="https://www.framer.com/motion/"
          className="mb-4 block"
          style={{
            color: themeVars.colors.palette.primary.default
          }}>
          https://www.framer.com/motion
        </a>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>ScrollProgress</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollProgress scrollYProgress={scrollYProgress} />
          <div ref={elementRef} className="h-80 overflow-y-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>{text}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
