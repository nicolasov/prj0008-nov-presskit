import { cn } from '@/lib/utils';

const INSTAGRAM_URL = 'https://instagram.com/novnovnovnovnovnovnov';

type InstagramLinkProps = {
  className?: string;
};

/** Icon only, never the word. Hover is opacity only. */
export default function InstagramLink({ className }: InstagramLinkProps) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className={cn(
        'inline-flex text-ink opacity-45 transition-opacity duration-hover ease-fade hover:opacity-100 focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4',
        className,
      )}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5" />
        <circle cx="12" cy="12" r="4.25" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}
