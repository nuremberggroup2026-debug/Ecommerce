import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendVerificationEmailParams = {
  email: string;
  name?: string | null;
  verifircationToken: string;
  userId: string;
};

export async function sendVerificationEmail({
  email,
  name,
  verifircationToken,
  userId,
}: SendVerificationEmailParams) {
  const appName = process.env.APP_NAME;
  const from = process.env.ADMIN_EMAIL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const verificationUrl = `${appUrl}/verify-email/${userId}/${verifircationToken}`;
  return await resend.emails.send({
    from: `${appName} <${from}>`,
    to: email,
    subject: "Verify your email address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify Your Email</h2>

        <p>Hello ${name || "there"},</p>

        <p>
          Thank you for registering. Please click the button below to verify
          your email address.
        </p>

        <p style="margin: 30px 0;">
          <a
            href="${verificationUrl}"
            style="
              background:#2563eb;
              color:white;
              padding:12px 24px;
              text-decoration:none;
              border-radius:6px;
              display:inline-block;
            "
          >
            Verify Email
          </a>
        </p>


        <p>
          If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
