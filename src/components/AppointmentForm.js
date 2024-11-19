'use client';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import FormField from './FormField';
import useFormValidation from '../hooks/useFormValidation';
import { sendAppointmentEmail } from '../services/appointment';

const AppointmentForm = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formData,
    errors,
    touched,
    handleChange,
    handleDateChange,
    handleBlur,
    validateForm,
    setErrors,
  } = useFormValidation({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: null, // Changed from '' to null for DatePicker
    time: '',
  });

  const services = [
    'Interior Detail',
    'Full Detail',
    'Deluxe Detail',
    'Spiffy Detail',
    'Clar Bar / Buff / Wax',
  ];

  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    timeSlots.push(`${displayHour}:00 ${period}`);
    timeSlots.push(`${displayHour}:30 ${period}`);
  }

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      try {
        await sendAppointmentEmail(formData);
        onSubmit?.(formData);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          submit: error.message,
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formFields = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'service', label: 'Service', type: 'select', options: services },
    {
      name: 'date',
      label: 'Preferred Date',
      component: DatePicker,
      selected: formData.date,
      onChange: (date) => handleDateChange(date, 'date'), // Fixed date handling
      filterDate: isWeekday,
      minDate: new Date(),
      placeholderText: 'Select a weekday',
      dateFormat: 'MMMM d, yyyy',
    },
    {
      name: 'time',
      label: 'Preferred Time',
      type: 'select',
      options: timeSlots,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 md:gap-4"
      noValidate
    >
      {formFields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={field.selected || formData[field.name]}
          onChange={field.onChange || handleChange}
          onBlur={handleBlur}
          error={errors[field.name]}
          touched={touched[field.name]}
        />
      ))}

      {errors.submit && (
        <p className="text-center text-sm text-red-500">{errors.submit}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="my-4 flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-3 text-xl font-semibold text-white shadow-sm transition duration-150 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-6 animate-spin" />
            Submitting...
          </>
        ) : (
          'Request Appointment'
        )}
      </button>
      <div className="rounded-lg px-4 text-base text-gray-900">
        <p>
          This form will submit a request for an appointment. We will follow up
          within one day to confirm your booking.
        </p>
      </div>
    </form>
  );
};

export default AppointmentForm;
