import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import Button from '@/ui/button';
import { toast, type ExternalToast } from 'sonner';
import useLocale from '@/locales/use-locale';

const TOAST_PAGE_I18N_PREFIX = 'pages.components.toast';

// 仅保留 toast 对象上可动态调用的简单状态方法
// Keep only simple toast methods that can be called dynamically.
type SimpleToastType = 'info' | 'success' | 'warning' | 'error';

interface Simple {
  labelKey: string;
  type?: SimpleToastType;
  className?: string;
}

interface SimpleToastPayload {
  message: string;
  type?: SimpleToastType;
  description?: string;
}

interface ActionToastPayload extends SimpleToastPayload {
  cancelLabel: string;
  actionLabel: string;
}

const simpleList: Simple[] = [
  { labelKey: `${TOAST_PAGE_I18N_PREFIX}.types.default` },
  { labelKey: `${TOAST_PAGE_I18N_PREFIX}.types.info`, type: 'info', className: 'bg-info!' },
  { labelKey: `${TOAST_PAGE_I18N_PREFIX}.types.success`, type: 'success', className: 'bg-success!' },
  { labelKey: `${TOAST_PAGE_I18N_PREFIX}.types.warning`, type: 'warning', className: 'bg-warning!' },
  { labelKey: `${TOAST_PAGE_I18N_PREFIX}.types.error`, type: 'error', className: 'bg-error!' }
];

const showToast = ({ message, type, description }: SimpleToastPayload) => {
  // 无类型时走默认 toast，避免把 default 当作 toast 方法动态调用
  // Use the base toast call when no type is provided.
  if (!type) {
    toast(message);
    return;
  }

  toast[type](message, {
    description
  });
};

const noop = () => {};

const showToastWithAction = ({ message, type, cancelLabel, actionLabel }: ActionToastPayload) => {
  const options = {
    cancel: {
      label: cancelLabel,
      onClick: noop
    },
    action: {
      label: actionLabel,
      onClick: noop
    }
  };

  // 无类型时复用默认 toast，同时保留 action/cancel 交互配置
  // Use the base toast call for default items while keeping action and cancel options.
  if (!type) {
    toast(message, options);
    return;
  }

  toast[type](message, options);
};

// 复用 sonner 暴露的 position 字段类型，避免位置值被拓宽为 string
// Reuse Sonner's position field type to keep values as valid toast positions.
const positions: { position: NonNullable<ExternalToast['position']>; labelKey: string }[] = [
  {
    position: 'top-left',
    labelKey: `${TOAST_PAGE_I18N_PREFIX}.positions.topLeft`
  },
  {
    position: 'top-center',
    labelKey: `${TOAST_PAGE_I18N_PREFIX}.positions.topCenter`
  },
  {
    position: 'top-right',
    labelKey: `${TOAST_PAGE_I18N_PREFIX}.positions.topRight`
  },
  {
    position: 'bottom-left',
    labelKey: `${TOAST_PAGE_I18N_PREFIX}.positions.bottomLeft`
  },
  {
    position: 'bottom-center',
    labelKey: `${TOAST_PAGE_I18N_PREFIX}.positions.bottomCenter`
  },
  {
    position: 'bottom-right',
    labelKey: `${TOAST_PAGE_I18N_PREFIX}.positions.bottomRight`
  }
];

// 模拟异步请求结果，用于展示 promise toast 的 loading/success 状态
// Mock an async result for the promise toast loading and success states.
const createToastPromise = (result: string): Promise<string> =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(result);
    }, 2000)
  );

const showToastWithPromise = (messages: { loading: string; success: string; error: string; result: string }) => {
  toast.promise(createToastPromise(messages.result), {
    loading: messages.loading,
    success: data => `${messages.success}: ${data}`,
    error: messages.error
  });
};

export default function ToastPage() {
  const { t } = useLocale();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t(`${TOAST_PAGE_I18N_PREFIX}.sections.simple`)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {simpleList.map((item, index) => {
              const label = t(item.labelKey);

              return (
                <Button
                  key={index}
                  variant={item.type ? 'ghost' : 'outline'}
                  className={item.className}
                  onClick={() =>
                    showToast({
                      message: t(`${TOAST_PAGE_I18N_PREFIX}.messages.toast`, { label }),
                      type: item.type,
                      description: item.type === 'info' ? t(`${TOAST_PAGE_I18N_PREFIX}.descriptions.info`) : undefined
                    })
                  }>
                  {label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t(`${TOAST_PAGE_I18N_PREFIX}.sections.withAction`)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {simpleList.map((item, index) => {
              const label = t(item.labelKey);

              return (
                <Button
                  key={index}
                  variant={item.type ? 'ghost' : 'outline'}
                  className={item.className}
                  onClick={() =>
                    showToastWithAction({
                      message: t(`${TOAST_PAGE_I18N_PREFIX}.messages.toast`, { label }),
                      type: item.type,
                      cancelLabel: t('common.cancel'),
                      actionLabel: t('common.action')
                    })
                  }>
                  {label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t(`${TOAST_PAGE_I18N_PREFIX}.sections.position`)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {positions.map((item, index) => {
              const label = t(item.labelKey);

              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => toast.info(t(`${TOAST_PAGE_I18N_PREFIX}.messages.info`, { label }), { position: item.position })}>
                  {label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t(`${TOAST_PAGE_I18N_PREFIX}.sections.withPromise`)}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={() =>
              showToastWithPromise({
                loading: t(`${TOAST_PAGE_I18N_PREFIX}.promise.loading`),
                success: t(`${TOAST_PAGE_I18N_PREFIX}.promise.success`),
                error: t(`${TOAST_PAGE_I18N_PREFIX}.promise.error`),
                result: t(`${TOAST_PAGE_I18N_PREFIX}.promise.result`)
              })
            }>
            {t(`${TOAST_PAGE_I18N_PREFIX}.actions.submit`)}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
