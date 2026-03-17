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
    const subject = readText(formData, 'subject') || 'New Contact Form Submission';
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
      subject: subject,
      html: createEmailHtml({
        name,
        email,
        phone: phone || 'N/A',
        message,
        formType: 'Contact',
      }),
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
