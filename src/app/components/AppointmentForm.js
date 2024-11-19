'use client';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Loader2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormField = ({
  label,
  name,
  error,
  touched,
  type = 'text',
  options,
  component: Component,
  ...props
}) => {
  const inputClassName = `
    block w-full rounded-md bg-white border-zinc-600
    text-gray-900 shadow-sm outline-none
    focus:border-zinc-800 focus:ring-zinc-800 focus:ring-2
    text-md p-2.5
    min-h-[42px] appearance-none
    ${error && touched ? 'border-red-500' : ''}
  `;

  const selectWrapperClassName = `
    relative block
    after:content-[''] after:pointer-events-none
    after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2
    after:border-8 after:border-transparent
    after:border-t-zinc-600
    after:ml-1
  `;

  const datePickerWrapperClassName = `
    w-full [&_.react-datepicker-wrapper]:w-full
    [&_.react-datepicker-wrapper_.react-datepicker__input-container]:w-full
  `;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="text-lg font-medium text-gray-900">
          {label}
        </label>
        {error && touched && <p className="text-base text-red-500">{error}</p>}
      </div>
      {Component ? (
        <div className={datePickerWrapperClassName}>
          <Component className={inputClassName} {...props} />
        </div>
      ) : type === 'select' ? (
        <div className={selectWrapperClassName}>
          <select
            id={name}
            name={name}
            className={`${inputClassName} pr-10`}
            required
            {...props}
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className={inputClassName}
          required
          {...props}
        />
      )}
    </div>
  );
};

const AppointmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        break;
      case 'phone':
        if (!value) error = 'Phone number is required';
        break;
      case 'service':
      case 'date':
      case 'time':
        if (!value)
          error = `Please select ${name === 'date' ? 'a' : ''} ${name}`;
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date: date }));
    if (touched.date) {
      setErrors((prev) => ({ ...prev, date: validateField('date', date) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const templateParams = {
          name: formData.name,
          email: formData.email,
          service: formData.service,
          date: formData.date ? formData.date.toISOString().split('T')[0] : '',
          time: formData.time,
          phone: formData.phone,
        };

        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );

        onSubmit?.(formData);
      } catch (error) {
        console.error('Error sending email:', error);
        setErrors((prev) => ({
          ...prev,
          submit: 'Failed to submit appointment request. Please try again.',
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formFields = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel' },
    { name: 'service', label: 'Service', type: 'select', options: services },
    {
      name: 'date',
      label: 'Preferred Date',
      component: DatePicker,
      selected: formData.date,
      onChange: handleDateChange,
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
