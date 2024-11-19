import { Sparkles } from 'lucide-react';
import Link from 'next/link';

const AppointmentButton = () => {
  return (
    <Link href="/appointment">
      <div className="mx-auto flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-customRed to-[#820009] px-4 py-12 text-center">
        {/* <div className="flex flex-row gap-4">
          <Sparkles className="size-12 text-white" />
        </div> */}
        <h2 className="text-3xl font-bold text-white">
          Ready to Make Your Car Shine?
        </h2>
        <span
          className="flex flex-row items-center justify-center gap-4 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-customRed transition-colors duration-300 hover:bg-gray-100"
          href="/appointment"
        >
          Schedule Appointment
          {/* <Sparkles className="size-8 text-customRed" /> */}
        </span>
      </div>
    </Link>
  );
};

export default AppointmentButton;
