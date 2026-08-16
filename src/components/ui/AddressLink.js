import { site } from '@/data/site';
import { cn } from './cn';

/**
 * The shop's street address, linking out to the Google Maps listing (same
 * target as the map's "Open in Maps"). `stacked` puts the two lines on
 * separate rows.
 */
export default function AddressLink({ stacked = false, className }) {
  return (
    <a
      className={cn('transition-colors hover:text-accent', className)}
      href={site.google}
      target="_blank"
      rel="noopener noreferrer"
    >
      {site.address1}
      {stacked ? <br /> : ', '}
      {site.address2}
    </a>
  );
}
