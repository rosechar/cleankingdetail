'use client';
import React from 'react';
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
    text-lg p-3
    min-h-[48px] appearance-none
    placeholder:text-gray-900
    ${hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-zinc-600 focus:border-zinc-800 focus:ring-zinc-800'}
    focus:ring-2
  `;

  const datePickerWrapperClassName = `
    [&_.react-datepicker]:font-sans
    w-full [&_.react-datepicker-wrapper]:w-full
    [&_.react-datepicker-wrapper_.react-datepicker__input-container]:w-full
    [&_.react-datepicker]:shadow-lg [&_.react-datepicker]:border-zinc-200
    [&_.react-datepicker__header]:bg-zinc-50 [&_.react-datepicker__header]:border-zinc-200
    [&_.react-datepicker__day]:text-lg [&_.react-datepicker__day]:p-2 [&_.react-datepicker__day]:leading-8
    [&_.react-datepicker__day--selected]:bg-zinc-800 [&_.react-datepicker__day--selected]:text-white
    [&_.react-datepicker__day--keyboard-selected]:bg-zinc-600
    [&_.react-datepicker__day:hover]:bg-zinc-100
    [&_.react-datepicker__day-name]:text-base [&_.react-datepicker__day-name]:text-zinc-600
    [&_.react-datepicker__triangle]:hidden
  `;

  const CustomCalendarContainer = ({ className, children }) => {
    return (
      <div className="-translate-y-3 scale-110">
        <div
          className={`${className} rounded-lg border border-zinc-200 bg-white shadow-lg`}
        >
          {children}
        </div>
      </div>
    );
  };

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="flex items-center justify-between px-2">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        type="button"
        className={`p-1 text-2xl text-gray-500 hover:text-gray-700 ${prevMonthButtonDisabled && 'hidden'}`}
      >
        {'<'}
      </button>
      <div className="text-lg font-medium">
        {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </div>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        type="button"
        className="p-1 text-2xl text-gray-500 hover:text-gray-700"
      >
        {'>'}
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-1.5">
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
            popperPlacement="top"
            renderCustomHeader={renderCustomHeader}
            calendarContainer={CustomCalendarContainer}
            className={`${getInputClassName(error && touched)} [&:placeholder-shown]:text-gray-900`}
            {...props}
            onBlur={() => {
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
