import useLocale, { LANGUAGE_MAP } from '@/locales/use-locale';
import { Icon } from '@/components/icon';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/ui/dropdowm-menu';
import { Button } from '@/ui/button';

export default function LocalePicker() {
  const { locale, setLocale } = useLocale();

  const localeList = Object.values(LANGUAGE_MAP).map(item => {
    return {
      key: item.locale,
      label: item.label,
      icon: <Icon icon={`local:${item.icon}`} size="20" className="rounded-md" />
    };
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon icon={`local:${LANGUAGE_MAP[locale].icon}`} size="20" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {localeList.map(item => (
          <DropdownMenuItem key={item.key} onClick={() => setLocale(item.key)}>
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
