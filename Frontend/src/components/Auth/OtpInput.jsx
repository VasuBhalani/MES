import React, { useRef } from 'react';

export const OtpInput = ({ length = 6, otpValue = '', onChange, error }) => {
  const inputsRef = React.useRef([]);

  const otpArray = otpValue.split('').concat(Array(length).fill('')).slice(0, length);

  const focusInput = (index) => {
    if (index >= 0 && index < length) {
      inputsRef.current[index]?.focus();
    }
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    // Create new otp string based on input
    let newOtp = otpArray.slice();
    newOtp[index] = val ? val.charAt(val.length - 1) : '';
    const joinedOtp = newOtp.join('');
    onChange(joinedOtp);

    if (val && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    onChange(pasteData.slice(0, length));
    focusInput(pasteData.length < length ? pasteData.length : length - 1);
  };

  return (
    <form onPaste={handlePaste} className="flex justify-center space-x-3">
      {otpArray.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`w-12 h-12 text-2xl font-semibold rounded-xl border text-center bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-400 transition ${
            error ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
          }`}
          placeholder="-"
          autoComplete="one-time-code"
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </form>
  );
};
