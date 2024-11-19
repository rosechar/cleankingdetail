'use client';
import React from 'react';
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
  const getInputClassName = (hasError) => `
    block w-full rounded-md bg-white
    text-gray-900 shadow-sm outline-none
    text-md p-2.5
    min-h-[42px] appearance-none
    placeholder:text-gray-900
    ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-zinc-600 focus:border-zinc-800 focus:ring-zinc-800'}
    focus:ring-2
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
        {error && touched && (
          <p className="text-right text-base text-red-500">{error}</p>
        )}
      </div>
      {Component ? (
        <div className={datePickerWrapperClassName}>
          <Component
            className={`${getInputClassName(error && touched)} [&:placeholder-shown]:text-gray-900`}
            {...props}
            onBlur={(e) => {
              props.onBlur?.({ target: { name, value: props.selected } });
            }}
          />
        </div>
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          className={getInputClassName(error && touched)}
          required
          {...props}
        >
          <option value="" className="text-gray-900">
            Select {label.toLowerCase()}
          </option>
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
          className={getInputClassName(error && touched)}
          required
          {...props}
        />
      )}
    </div>
  );
};

export default FormField;
