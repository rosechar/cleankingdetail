import BookPage from './BookPage';

export const metadata = {
  title: 'Book a Car Detailing Appointment | Clean King — Blissfield, MI',
  description:
    'Schedule your car detailing and window tinting appointment online. Book interior, exterior, or full detail services from $35-$160. Quick and easy online booking for Blissfield, Adrian, Tecumseh areas.',
  openGraph: {
    title: 'Book a Car Detailing Appointment | Clean King — Blissfield, MI',
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
