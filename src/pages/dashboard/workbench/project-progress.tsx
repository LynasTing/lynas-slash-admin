import { GLOBAL_CONFIG } from '@/config/global';
import Progress from '@/ui/progress';
import Button from '@/ui/button';
import { Card } from '@/ui/card';
import { Icon } from '@/components/icon';
import { Text } from '@/ui/typography';
import useLocale from '@/locales/use-locale';

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
  const { t } = useLocale();

  return (
    <Card className="flex flex-col gap-4 p-6">
      <Text variant="body2" className="mb-2 font-semibold">
        {t('dashboard.projectTitle', { appName: GLOBAL_CONFIG.appName })}
      </Text>
      <div className="mb-2 flex items-center justify-between">
        <Text variant="body2">{t('dashboard.releaseVersion', { version: GLOBAL_CONFIG.appVersion })}</Text>
        <span className="text-xs font-bold text-blue-500">70%</span>
      </div>
      <Progress value={70} />
      <ul className="mt-2 mb-4 flex flex-col gap-2">
        {projectTasks.map(item => (
          <li key={item.label} className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <Text variant="body2">{item.label}</Text>
          </li>
        ))}
      </ul>
      <Button className="mt-auto w-full" size="sm">
        <Icon icon="mdi:plus" size={18} />
        {t('dashboard.addTask')}
      </Button>
    </Card>
  );
}
