import { NextResponse } from 'next/server';
import { sendEmail, createEmailHtml } from '../../../lib/mailer';

function readText(formData, key) {
  return String(formData.get(key) || '').trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = readText(formData, 'name');
    const email = readText(formData, 'email');
    const phone = readText(formData, 'phone');
    const company = readText(formData, 'company');
    const country = readText(formData, 'country');
    const partnershipType = readText(formData, 'partnershipType');
    const message = readText(formData, 'message');

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    await sendEmail({
      to: 'info@surgimakers.com',
      subject: `New Partnership Request - ${company || name || 'Unknown'}`,
      html: createEmailHtml({
        name,
        email,
        phone: phone || 'N/A',
        message,
        formType: 'Partner',
        additionalFields: {
          'Company': company || 'N/A',
          'Country': country || 'N/A',
          'Partnership Type': partnershipType || 'N/A',
        },
      }),
    });

    return NextResponse.json(
      { success: true, message: 'Partnership request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Partner form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send request' },
      { status: 500 }
    );
  }
}
