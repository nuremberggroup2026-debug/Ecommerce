import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendPasswordResetEmailParams = {
  email: string;
  name?: string | null;
  resetToken: string;
};

export async function sendPasswordResetEmail({
  email,
  name,
  resetToken,
}: SendPasswordResetEmailParams) {
  const appName = process.env.APP_NAME;
  const from = process.env.ADMIN_EMAIL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const resetUrl = `${appUrl}/reset-password/${resetToken}`;

  return await resend.emails.send({
    from: `${appName} <${from}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #171717;">
        <h2>Reset Your Password</h2>

        <p>Hello ${name || "there"},</p>

        <p>
          We received a request to reset the password for your account. 
          If you made this request, please click the button below to set a new password.
        </p>

        <p style="margin: 30px 0;">
          <a
            href="${resetUrl}"
            style="
              background: #000000;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 12px;
              letter-spacing: 1px;
            "
          >
            Reset Password
          </a>
        </p>

        <p style="color: #666666; font-size: 14px;">
          If you didn't request a password reset, you can safely ignore this email. 
          Your password will remain unchanged.
        </p>
      </div>
    `,
  });
}
