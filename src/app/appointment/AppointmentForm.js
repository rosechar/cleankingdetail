'use client';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import FormField from './FormField';
import useFormValidation from '@/hooks/useFormValidation';
import { sendAppointmentEmail } from '@/services/appointment';

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
    date: null,
  });

  const services = [
    'Interior Detail',
    'Full Detail',
    'Deluxe Detail',
    'Spiffy Detail',
    'Clay Bar / Wax',
    'Clay Bar / Buff / Wax',
  ];

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
      onChange: (date) => handleDateChange(date, 'date'),
      filterDate: isWeekday,
      minDate: new Date(),
      placeholderText: 'Select a weekday',
      dateFormat: 'MMMM d, yyyy',
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 md:gap-3"
      noValidate
    >
      {formFields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <FormField
            {...field}
            value={field.selected || formData[field.name]}
            onChange={field.onChange || handleChange}
            onBlur={handleBlur}
            error={errors[field.name]}
            touched={touched[field.name]}
          />
        </div>
      ))}
      <div className="rounded-lg px-2 text-sm text-gray-900 md:mt-0">
        To deliver the best possible detail, we kindly ask for vehicle drop-offs
        between 9:30 AM - 10:00 AM
      </div>

      {errors.submit && (
        <p className="text-center text-sm text-red-500">{errors.submit}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-3 text-xl font-semibold text-white shadow-sm transition duration-150 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400"
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
    </form>
  );
};

export default AppointmentForm;
