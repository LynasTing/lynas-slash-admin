import { GLOBAL_CONFIG } from '@/config/global';
import Progress from '@/ui/progress';
import Button from '@/ui/button';
import { Card } from '@/ui/card';
import { Icon } from '@/components/icon';
import { Text } from '@/ui/typography';
import { useTranslation } from 'react-i18next';

/**
 * 项目任务数据类型
 * Project task data type
 */
export interface ProjectTaskData {
  /**
   * 任务或项目标签
   * Task or project label
   */
  label: string;
  /**
   * 任务颜色
   * Task color
   */
  color: string;
}

/**
 * 项目进度
 * Project progress
 */
export function ProjectProgres({ projectTasks }: { projectTasks: ProjectTaskData[] }) {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col gap-4 p-6">
      <Text variant="body2" className="font-semibold mb-2">
        Project - {GLOBAL_CONFIG.appName}
      </Text>
      <div className="flex justify-between items-center mb-2">
        <Text variant="body2">Release v{GLOBAL_CONFIG.appVersion}</Text>
        <span className="text-xs font-bold text-blue-500">70%</span>
      </div>
      <Progress value={70} />
      <ul className="flex flex-col gap-2 mt-2 mb-4">
        {projectTasks.map(item => (
          <li key={item.label} className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <Text variant="body2">{item.label}</Text>
          </li>
        ))}
      </ul>
      <Button className="w-full mt-auto" size="sm">
        <Icon icon="mdi:plus" size={18} />
        {t('dashboard.addTask')}
      </Button>
    </Card>
  );
}
