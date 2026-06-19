import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';

export default function ExternalLinkPage({ src }: { src: string }) {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.open(src, '_blank');
    navigate(-1);
  }, [src, navigate]);
  return <div>External Link</div>;
}
