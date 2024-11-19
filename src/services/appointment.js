import emailjs from '@emailjs/browser';

export const sendAppointmentEmail = async (formData) => {
  const templateParams = {
    name: formData.name,
    email: formData.email,
    service: formData.service,
    date: formData.date
      ? formData.date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '',
    time: formData.time,
    phone: formData.phone,
  };

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to submit appointment request. Please try again.');
  }
};
