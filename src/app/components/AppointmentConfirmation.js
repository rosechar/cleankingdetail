export const AppointmentConfirmation = ({ submittedData }) => {
  return (
    <div className="mx-auto min-h-screen max-w-md px-4 text-center text-lg text-gray-600 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col items-center justify-center gap-6">
        <svg
          className="size-32 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p>
          Thank you for your request. We will contact you within one business
          day to confirm your appointment.
        </p>
        <div className="italic">
          <p>Requested Service: {submittedData.service}</p>
          <p>Date: {new Date(submittedData.date).toLocaleDateString()}</p>
          <p>Time: {submittedData.time}</p>
        </div>
      </div>
    </div>
  );
};
