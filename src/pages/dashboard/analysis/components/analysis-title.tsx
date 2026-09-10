import { CardHeader, CardTitle } from '@/ui/card';
import { Title } from '@/ui/typography';

export function AnalysisTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle>
        <Title as="h3" className="text-lg">
          {title}
        </Title>
      </CardTitle>
      {children}
    </CardHeader>
  );
}
