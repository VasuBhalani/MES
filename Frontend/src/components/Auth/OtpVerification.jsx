import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { OtpInput } from './OtpInput'; // your 6-box OTP input component
import { verifyOtpForPasswordReset, sendOtpForPasswordReset } from '../../services/operations/authAPI';
import { set } from 'react-hook-form';

export const OtpVerification = ({ otpToken, email, onOtpVerified, onResend }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  const handleChange = (val) => {
    setOtp(val);
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (otp.length !== 6) {
    setError('Please enter the full 6-digit OTP.');
    return;
  }
  setLoading(true);
  try {
    const res = await verifyOtpForPasswordReset({ token: otpToken, otp });
    toast.success('OTP verified successfully!');
    onOtpVerified(res.resetToken);
  } catch (err) {
    setError(err.response?.data?.message || 'Invalid OTP');
    toast.error('OTP verification failed');
    setOtp('');  // clear OTP input
    // do NOT clear error here; keep error message displayed
  } finally {
    setLoading(false);
  }
};


 const handleResendClick = async () => {
  if (timeLeft > 0) return;

  setLoading(true);
  setOtp('');    // Clear OTP input here — once

  setError(null);

  try {
    const res = await sendOtpForPasswordReset({ email });
    toast.success('OTP resent! Check your email.');
    onResend(res.token);
    setTimeLeft(50);
  } catch {
    toast.error('Failed to resend OTP');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full border border-gray-100 text-center">
        <h2 className="text-2xl font-extrabold mb-4 text-gray-900 tracking-wide">Enter OTP</h2>
        <p className="mb-6 text-gray-600">Please enter the 6-digit code sent to your email.</p>

        <form onSubmit={handleSubmit}>
          <OtpInput length={6} onChange={handleChange} error={error} otpValue={otp} />
          {error && <p className="mt-3 text-red-600 font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-3xl text-white text-lg font-semibold shadow-md disabled:opacity-60 transition"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="mt-6 flex justify-center items-center space-x-4 text-gray-600">
          <span>Didn&apos;t receive the OTP?</span>
          <button
            disabled={timeLeft > 0 || loading}
            onClick={handleResendClick}
            className={`text-blue-600 font-medium hover:underline focus:outline-none ${
              timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Resend OTP {timeLeft > 0 ? `in 00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};
