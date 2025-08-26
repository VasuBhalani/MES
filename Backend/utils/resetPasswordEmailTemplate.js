
export const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en" style="margin:0; padding:0; background-color:#f9fafb;">
<head>
 <style>
          /* General Reset */
          body, html {
            margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            color: #333333;
          }
          table {
            border-spacing: 0;
            border-collapse: collapse;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          }
          img {
            display: block;
            height: auto;
            max-width: 100px;
            margin: 24px auto 16px;
          }
          h1 {
            font-size: 24px;
            font-weight: 600;
            color: #111827;
            text-align: center;
            margin: 8px 24px;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            margin: 12px 24px;
            color: #555555;
            text-align: center;
          }
          a.button {
            background-color: #2563eb;
            color: white !important;
            text-decoration: none;
            padding: 12px 24px;
            margin: 24px auto;
            border-radius: 6px;
            display: inline-block;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
            transition: background-color 0.3s ease;
          }
          a.button:hover {
            background-color: #1d4ed8;
          }
          .footer {
            font-size: 12px;
            color: #999999;
            text-align: center;
            padding: 12px 24px 24px;
          }
          /* Responsive */
          @media only screen and (max-width: 480px) {
            h1 {
              font-size: 20px;
            }
            p, a.button {
              font-size: 14px;
            }
            img {
              max-width: 80px;
              margin: 16px auto 12px;
            }
            table {
              margin: 0 12px;
            }
          }
        </style>
</head>
<body>
  <table role="presentation" aria-hidden="true" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center">
        <img src="https://cdn4.iconfinder.com/data/icons/classes-of-information-systems-1/512/MES-1024.png" alt="SmartMES Logo" width="100" height="100" style="border-radius:8px;" />
      </td>
    </tr>
    <tr>
      <td>
        <h1>Your OTP Code</h1>
        <p>Use the following One-Time Password (OTP) to verify your identity and reset your SmartMES password. This code is valid for 10 minutes.</p>
        <span class="otp-code">${otp}</span>
        <p>If you did not request this code, please ignore this email or contact support.</p>
        <p>Thank you,<br />The SmartMES Team</p>
      </td>
    </tr>
    <tr>
      <td class="footer">
        SmartMES &copy; 2025. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;


       