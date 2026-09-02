import { LineLoading } from '@/components/loading';
import Button from '@/ui/button';
import { useEffect, useRef, useState } from 'react';

const IFRAME_LOAD_TIMEOUT_MS: number = 15_000;

export default function IframeLinkPage({ src = '' }: { src: string }) {
  const [isLoading, setLoading] = useState(true);
  const [hasFailed, setFailed] = useState<boolean>(false);
  const timeoutIdRef = useRef<number | undefined>(undefined);

  const clearLoadTimeout: () => void = () => {
    /**
     * 仅在存在已登记的超时时清理，避免覆盖 iframe 已成功加载后的状态。
     * Clear only a registered timeout to preserve the state after a successful iframe load.
     */
    if (timeoutIdRef.current !== undefined) {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = undefined;
    }
  };

  useEffect((): (() => void) => {
    /**
     * 跨域 iframe 被站点策略拒绝时通常不会触发 onError；超时让用户始终能得到可操作的回退。
     * Cross-origin iframe policy rejections usually do not trigger onError, so a timeout always gives the user an actionable fallback.
     */
    setLoading(true);
    setFailed(false);

    timeoutIdRef.current = window.setTimeout(() => {
      setLoading(false);
      setFailed(true);
    }, IFRAME_LOAD_TIMEOUT_MS);

    return clearLoadTimeout;
  }, [src]);

  const handleIframeLoad: () => void = () => {
    clearLoadTimeout();
    setLoading(false);
  };

  const handleIframeError: () => void = () => {
    clearLoadTimeout();
    setLoading(false);
    setFailed(true);
  };

  if (hasFailed) {
    return (
      <div className="flex size-full grow items-center justify-center p-6">
        <div className="w-full max-w-lg border border-warning/40 bg-warning/5 p-6 text-center">
          <p className="font-semibold">Unable to load the embedded site</p>
          <p className="mt-2 text-sm text-muted-foreground">The site may block embedding in another application.</p>
          <Button asChild className="mt-5">
            <a href={src} target="_blank" rel="noopener noreferrer">
              Open in new window
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex size-full grow flex-col items-center justify-center">
      {isLoading && <LineLoading />}
      <iframe
        src={src}
        title="iframe-page"
        className="size-full grow"
        style={{ border: 0 }}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  );
}
