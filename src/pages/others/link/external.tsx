import Button from '@/ui/button';

export default function ExternalLinkPage({ src }: { src: string }) {
  return (
    <div className="flex size-full grow items-center justify-center p-6">
      <div className="w-full max-w-lg border border-dashed p-6 text-center">
        <p className="font-semibold">External link</p>
        <p className="mt-2 text-sm text-muted-foreground">Open the destination in a new browser window.</p>
        <Button asChild className="mt-5">
          <a href={src} target="_blank" rel="noopener noreferrer">
            Open in new window
          </a>
        </Button>
      </div>
    </div>
  );
}
