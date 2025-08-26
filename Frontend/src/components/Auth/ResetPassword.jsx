import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-hot-toast';

import { updatePassword } from '../../services/operations/authAPI';

export const ResetPassword = ({ resetToken, onResetSuccess }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password', '');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updatePassword({ resetToken, newPassword: data.password });
      toast.success('Password updated successfully!');
      onResetSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center px-3">
      <div className="w-full sm:max-w-md bg-white rounded-xl shadow-2xl px-10 py-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/automation.png" alt="MES Logo" className="w-16 h-16 drop-shadow-md" />
        </div>

        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-10 tracking-wide">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* New Password */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="New Password"
              autoComplete="new-password"
              {...register('password', {
                required: 'New password is required',
                minLength: { value: 6, message: 'Minimum 6 characters required' },
              })}
              className={`w-full rounded-xl border py-3 pl-12 pr-10 shadow-sm bg-[#f8fbff] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition
                ${errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}`}
            />
            <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </button>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 font-semibold">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              className={`w-full rounded-xl border py-3 pl-12 pr-10 shadow-sm bg-[#f8fbff] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition
                ${errors.confirmPassword ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}`}
            />
            <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </button>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 font-semibold">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow-md transition-all tracking-wide disabled:opacity-60"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
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
