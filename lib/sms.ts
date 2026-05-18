import AfricasTalking from "africastalking";

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY as string,
  username: process.env.AT_USERNAME as string,
});

const sms = at.SMS;

export async function sendSMS(phone: string, message: string) {
  try {
    const result = await sms.send({
      to: [phone],
      message,
      from: process.env.AT_SENDER_ID,
    });
    return result;
  } catch (err) {
    console.error("[SMS Error]", err);
    throw err;
  }
}
