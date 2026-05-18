import AfricasTalking from "africastalking";

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY!,
  username: process.env.AT_USERNAME!,
});

const sms = at.SMS;

/**
 * Sends an SMS using Africa's Talking SDK.
 * failure is logged but does not throw an error to avoid blocking the main flow.
 */
export async function sendSMS(phone: string, message: string): Promise<void> {
  try {
    const result = await sms.send({
      to: [phone],
      message,
      from: process.env.AT_SENDER_ID || undefined,
    });
    console.log("SMS sent successfully:", JSON.stringify(result));
  } catch (error) {
    console.error("SMS sending failed:", error);
  }
}

/**
 * Formats a phone number to the international format required by Africa's Talking (+254...)
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\s+/g, "").replace(/^0/, "+254");
  return cleaned.startsWith("+") ? cleaned : `+254${cleaned}`;
}
