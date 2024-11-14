import React from 'react';
import AppointmentForm from '../components/AppointmentForm';

const Appointment = () => {
  
    return (
      <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
  
          <div className=" text-gray-800 p-4 space-y-6  border-red-700">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Request Appointment</h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
          </div>
            
            <AppointmentForm />
          </div>
        </div>
      </div>
    );
  };
  
  export default Appointment;
