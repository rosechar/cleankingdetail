import BookPage from './BookPage';

export const metadata = {
  title: 'Book a Car Detailing Appointment | Clean King — Blissfield, MI',
  description:
    'Schedule your car detailing and window tinting appointment online. Book interior, exterior, or full detail services from $35-$160. Quick and easy online booking for Blissfield, Adrian, Tecumseh areas.',
  keywords:
    'book car wash appointment, schedule car detailing, online booking car wash, appointment car detailing Blissfield MI, book window tinting appointment, schedule auto detail',
  openGraph: {
    title: 'Book a Car Detailing Appointment | Clean King — Blissfield, MI',
    description:
      'Schedule your car wash, detailing, or window tinting service online. Easy booking system for Blissfield, Adrian, and Tecumseh areas.',
    url: 'https://www.cleankingdetail.com/appointment',
  },
  alternates: {
    canonical: 'https://www.cleankingdetail.com/appointment',
  },
};

export default function Appointment() {
  return <BookPage />;
}
