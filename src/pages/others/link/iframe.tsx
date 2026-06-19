import { LineLoading } from '@/components/loading';
import { useState } from 'react';

export default function IframeLinkPage({ src = '' }: { src: string }) {
  const [isLoading, setLoading] = useState(true);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
  };

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
