"use client";
import React, { useState } from 'react';

const FormField = ({ label, name, error, touched, type = "text", options, ...props }) => {
  const inputClassName = `
    block w-full rounded-md bg-zinc-100 border-zinc-600 
    text-gray-900 shadow-sm outline-none
    focus:border-zinc-800 focus:ring-zinc-800 focus:ring-2
    text-md p-2.5
    ${error && touched ? 'border-red-500' : ''}
  `;

  return (
    <div>
      <div className="flex items-center gap-4 justify-between">
        <label htmlFor={name} className="text-lg font-medium text-gray-900">
          {label}
        </label>
        {error && touched && (
          <p className="text-md text-red-500">{error}</p>
        )}
      </div>
      {type === "select" ? (
        <select
          id={name}
          name={name}
          className={inputClassName}
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
    time: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const services = [
    "Premium Full Detail",
    "Exterior Detail",
    "Interior Deep Clean",
    "Paint Correction",
    "Ceramic Coating"
  ];

  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    timeSlots.push(`${displayHour}:00 ${period}`);
    timeSlots.push(`${displayHour}:30 ${period}`);
  }

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
        if (!value) error = `Please select ${name === 'date' ? 'a' : ''} ${name}`;
        if (name === 'date') {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) error = 'Please select a future date';
        }
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    // Mark all fields as touched
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      onSubmit?.(formData);
    }
  };

  const formFields = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel' },
    { name: 'service', label: 'Service', type: 'select', options: services },
    { name: 'date', label: 'Preferred Date', type: 'date', min: new Date().toISOString().split('T')[0] },
    { name: 'time', label: 'Preferred Time', type: 'select', options: timeSlots },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {formFields.map(field => (
        <FormField
          key={field.name}
          {...field}
          value={formData[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors[field.name]}
          touched={touched[field.name]}
        />
      ))}

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-xl font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
      >
        Request Appointment
      </button>

      <div className="rounded-lg p-4 text-md text-gray-900">
        <p>This form will submit a request for an appointment. We will follow up within one day to confirm your booking.</p>
      </div>
    </form>
  );
};

export default AppointmentForm;