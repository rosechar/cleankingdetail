import Link from "next/link";

const AppointmentButton = () => {
    return (
    <Link
        href="/appointment"
      >
        <div className="max-w-4xl mx-auto text-center bg-customRed py-12 px-4">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Make Your Car Shine?</h2>
          <span
            className="bg-white text-customRed hover:bg-gray-100 text-lg px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            href="/appointment"
          >
            Schedule Appointment
          </span>
        </div>
      </Link>
    );
}

export default AppointmentButton;