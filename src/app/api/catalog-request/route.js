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
    const serviceType = readText(formData, 'serviceType');
    const requirements = readText(formData, 'requirements');

    if (!name || !email || !requirements) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and requirements are required' },
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
      subject: `New Catalog Request - ${company || name || 'Unknown'}`,
      html: createEmailHtml({
        name,
        email,
        phone,
        message: requirements,
        formType: 'Catalog',
        additionalFields: {
          'Company': company || 'N/A',
          'Service Type': serviceType || 'N/A',
        },
      }),
    });

    return NextResponse.json(
      { success: true, message: 'Request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Catalog request error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send request' },
      { status: 500 }
    );
  }
}
