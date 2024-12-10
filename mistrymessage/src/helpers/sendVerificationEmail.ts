import { Resend } from 'resend';
import { render } from '@react-email/render';
import VerificationEmail from '../../emails/VerificationEmail'; // Adjust the path
import { ApiResponse } from '@/type/ApiResponse';


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse>{
  try{
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'email',
      subject: 'Mstry message | Verification code',
      react: VerificationEmail({username,otp:verifyCode}),
    });
      return { success: true, message: "Verification email sent successfully"};
  }catch(emailError){
    console.error("Failed to send email", emailError);
    return { success: false, message: "Failed to send verification email"};
  }
}