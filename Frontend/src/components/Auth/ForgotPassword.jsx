import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineMail } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

import { sendOtpForPasswordReset } from '../../services/operations/authAPI';

export const ForgotPassword = ({ onOtpSent }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await sendOtpForPasswordReset({ email: data.email });
      toast.success('OTP sent! Please check your email.');
      onOtpSent({ token: res.token, email: data.email }); // we are set email in state var for resending OTP becasue for that we are call same api
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center px-2">
      <div className="w-full sm:max-w-md bg-white rounded-xl shadow-2xl px-8 py-10">
        <div className="flex flex-col items-center mb-6">
          <img src="/automation.png" alt="MES Logo" className="w-14 h-14 mb-2" />
        </div>

        <h2 className="text-xl font-bold text-center text-gray-900 mb-8 tracking-wide">
          Forgot your password?
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <div className="relative">
              <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl" />
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Your email address"
                {...register('email', { required: 'Email is required' })}
                className={`pl-12 pr-4 py-3 w-full rounded-xl border border-gray-200 bg-[#f8fbff] text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-base transition
                  ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-200'}`}
                style={{ fontFamily: "'Inter', Segoe UI, Arial, sans-serif" }}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 font-semibold">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow-md transition-all tracking-wide"
            style={{ fontFamily: "'Inter', Segoe UI, Arial, sans-serif" }}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/login" className="text-sm text-blue-600 hover:underline font-medium transition">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};
