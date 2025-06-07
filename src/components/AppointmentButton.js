import { Phone } from 'lucide-react';

export const AppointmentButton = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-customRed to-pink-800 px-4 py-8 text-center">
      {/* <div className="flex flex-row gap-4">
          <Sparkles className="size-12 text-white" />
        </div> */}
      <h2 className="text-3xl text-white">Ready to Make Your Car Shine?</h2>
      <div className="flex w-full flex-col gap-8 md:w-full md:flex-row md:gap-10">
        <a
          className="flex w-full flex-row items-center justify-center gap-4 rounded-lg bg-white py-3 text-lg font-semibold text-customRed transition-colors duration-300 hover:bg-gray-100"
          href="/appointment"
        >
          Schedule Appointment
          {/* <Sparkles className="size-8 text-customRed" /> */}
        </a>
        <a
          className="flex w-full flex-row items-center justify-center gap-4 rounded-lg bg-white py-3 text-lg font-semibold text-customRed transition-colors duration-300 hover:bg-gray-100"
          href="tel:5176821919"
        >
          <Phone /> (517) 682-1919
          {/* <Sparkles className="size-8 text-customRed" /> */}
        </a>
      </div>
    </div>
  );
};
