import { PRICE_RANGE } from '@/data/site';
import BookPage from './BookPage';

export const metadata = {
  title: 'Book Car Detailing Online — Blissfield, MI | Clean King',
  description: `Schedule your car detailing and window tinting appointment online. Book interior, exterior, or full detail services from ${PRICE_RANGE}. Quick and easy online booking for Blissfield, Adrian, Tecumseh areas.`,
  openGraph: {
    title: 'Book Car Detailing Online — Blissfield, MI | Clean King',
    description:
      'Schedule your car wash, detailing, or window tinting service online. Easy booking system for Blissfield, Adrian, and Tecumseh areas.',
    url: '/appointment',
  },
  alternates: {
    canonical: '/appointment',
  },
};

export default function Appointment() {
  return <BookPage />;
}
