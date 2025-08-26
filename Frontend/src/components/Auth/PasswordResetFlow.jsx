import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { ForgotPassword } from './ForgotPassword';
import { OtpVerification } from './OtpVerification';
import { ResetPassword } from './ResetPassword';

export const PasswordResetFlow = () => {
  const [otpToken, setOtpToken] = useState(null); // First token (50s lifetime)
  const [resetToken, setResetToken] = useState(null); // Second token for final reset
  const [email, setEmail] = useState(null); // this is to store the email for resending OTP
  const navigate = useNavigate();

  const handleOtpSent = ({ token, email: userEmail }) => {
    setOtpToken(token);
    setEmail(userEmail);
  };

  return (
    <>
      {!otpToken && (
        <ForgotPassword
          onOtpSent={({ token, email }) => handleOtpSent({ token, email })}
        />
      )}

      {otpToken && !resetToken && (
        <OtpVerification
          otpToken={otpToken}
          email={email}
          onOtpVerified={(token) => setResetToken(token)} // callback to set the reset token
          onResend={(token) => setOtpToken(token)} // callback to update otpToken on resend
        />
      )}

      {resetToken && (
        <ResetPassword
          resetToken={resetToken}
          onResetSuccess={() => {
            toast.success('Password reset successfully! Please login.');
            navigate('/login', { replace: true });
          }}
        />
      )}
    </>
  );
};
