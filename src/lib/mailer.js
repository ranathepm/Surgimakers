import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendEmail({
  to = 'info@surgimakers.com',
  subject,
  html,
  text,
}) {
  if (!resend) {
    throw new Error('Email service is not configured');
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Surgi Makers <noreply@surgimakers.com>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export function createEmailHtml({
  name,
  email,
  phone,
  message,
  formType = 'Contact',
  additionalFields = {},
}) {
  const formTitle = {
    'Contact': 'Contact Form Submission',
    'Partner': 'Partnership Request',
    'Catalog': 'Catalog Request',
  }[formType] || 'Form Submission';

  let additionalFieldsHtml = '';
  for (const [key, value] of Object.entries(additionalFields)) {
    if (value) {
      additionalFieldsHtml += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>${escapeHtml(key)}:</strong></td>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">${escapeHtml(value)}</td>
        </tr>
      `;
    }
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${formTitle}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f5; padding: 40px 0;">
        <tr>
          <td>
            <table width="600" cellpadding="0" cellspacing="0" style="margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.08);">
              <tr>
                <td style="background: linear-gradient(135deg, #dc2626, #b91c1c); padding: 40px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">${formTitle}</h1>
                  <p style="margin: 12px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Surgi Makers Website</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr style="border-bottom: 1px solid #f0f0f0;">
                      <td style="padding: 16px 0; color: #666; font-size: 14px; font-weight: 600; width: 140px;">Name</td>
                      <td style="padding: 16px 0; color: #333; font-size: 15px;">${escapeHtml(name || 'N/A')}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f0f0f0;">
                      <td style="padding: 16px 0; color: #666; font-size: 14px; font-weight: 600;">Email</td>
                      <td style="padding: 16px 0; font-size: 15px;">
                        <a href="mailto:${escapeHtml(email || '')}" style="color: #dc2626; text-decoration: none;">${escapeHtml(email || 'N/A')}</a>
                      </td>
                    </tr>
                    ${phone ? `
                    <tr style="border-bottom: 1px solid #f0f0f0;">
                      <td style="padding: 16px 0; color: #666; font-size: 14px; font-weight: 600;">Phone</td>
                      <td style="padding: 16px 0; font-size: 15px;">${escapeHtml(phone)}</td>
                    </tr>
                    ` : ''}
                    ${additionalFieldsHtml}
                  </table>

                  <div style="margin-top: 32px;">
                    <h3 style="margin: 0 0 12px 0; color: #333; font-size: 18px; font-weight: 600;">Message</h3>
                    <p style="margin: 0; background: #fafafa; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; font-size: 15px; line-height: 1.7;">
                      ${escapeHtml(message || 'No message provided')}
                    </p>
                  </div>

                  <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f0f0f0;">
                    <p style="margin: 0; font-size: 14px; color: #666;">
                      This message was sent from the <a href="https://surgimakers.com" style="color: #dc2626; text-decoration: none;">Surgi Makers</a> website.
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
