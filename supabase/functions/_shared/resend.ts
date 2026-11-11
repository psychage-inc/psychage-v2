/**
 * RESEND TRANSACTIONAL EMAIL
 *
 * The one send path for edge-function email. Throws when RESEND_API_KEY is
 * missing (fail fast: a missing key is a deployment error, not a reason to
 * skip delivery). Never logs the recipient address or the provider response
 * body, which can echo the address back.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
export const FROM_NAME = 'Psychage';
const DEFAULT_FROM_ADDRESS = 'security@psychage.com';

export interface EmailMessage {
    to: string;
    subject: string;
    html: string;
}

/**
 * Send one email through Resend.
 *
 * @returns true when Resend accepted the message, false when it rejected it
 *   (the HTTP status is logged; the body and recipient are not).
 * @throws when RESEND_API_KEY is not configured.
 */
export async function sendEmail(message: EmailMessage, logTag: string): Promise<boolean> {
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
        throw new Error('RESEND_API_KEY is not configured');
    }
    const fromAddress = Deno.env.get('NOTIFICATION_FROM_EMAIL') ?? DEFAULT_FROM_ADDRESS;

    const resp = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: `${FROM_NAME} <${fromAddress}>`,
            to: message.to,
            subject: message.subject,
            html: message.html,
        }),
    });

    if (!resp.ok) {
        await resp.body?.cancel();
        console.error(`${logTag}: resend send failed with status ${resp.status}`);
        return false;
    }
    await resp.body?.cancel();
    return true;
}
