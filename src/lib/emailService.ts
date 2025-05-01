import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendViolationNotification = async (
  email: string,
  violationDetails: {
    vehicleNumber: string;
    violationType: string;
    amount: number;
    paymentLink: string;
    ownerName: string;
  }
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Traffic Control <alerts@freshroots.shop>',
      to: email,
      subject: `Traffic Violation Notice - ${violationDetails.vehicleNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Traffic Violation Notice</h2>
          <p>Dear ${violationDetails.ownerName},</p>
          <p>This is to inform you that your vehicle with registration number <strong>${violationDetails.vehicleNumber}</strong> has been recorded violating traffic rules.</p>
          <div style="padding: 20px; border: 1px solid #ddd; margin: 20px 0;">
            <h3>Violation Details:</h3>
            <ul>
              <li>Vehicle Number: <strong>${violationDetails.vehicleNumber}</strong></li>
              <li>Violation Type: <strong>${violationDetails.violationType}</strong></li>
              <li>Fine Amount: <strong>₹${violationDetails.amount}</strong></li>
            </ul>
          </div>
          <p><strong>Important:</strong> Please pay the fine within 30 days to avoid additional penalties.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${violationDetails.paymentLink}" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Pay Fine Now</a>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};