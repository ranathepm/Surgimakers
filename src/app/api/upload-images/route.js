import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ALLOWED_IMAGE_HOSTS = new Set(['medicalinst.net', 'www.medicalinst.net']);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB

function isAllowedImageUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return url.protocol === 'https:' && ALLOWED_IMAGE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

function sanitizeFilename(filename) {
  const clean = String(filename || '')
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 120);

  if (!clean || !/\.(jpg|jpeg|png|webp|avif)$/i.test(clean)) {
    return null;
  }
  return clean;
}

export async function POST(request) {
  try {
    const requiredToken = process.env.UPLOAD_API_TOKEN;
    const providedToken = request.headers.get('x-upload-token');
    if (requiredToken && providedToken !== requiredToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, productUrl, filename } = body;

    if (action !== 'upload') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (!isAllowedImageUrl(productUrl)) {
      return NextResponse.json({ error: 'Invalid product URL' }, { status: 400 });
    }

    const safeFilename = sanitizeFilename(filename);
    if (!safeFilename) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const response = await fetch(productUrl, { cache: 'no-store' });
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to download image' }, { status: 400 });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'URL did not return an image' }, { status: 400 });
    }

    const imageData = await response.arrayBuffer();
    if (imageData.byteLength > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: 'Image exceeds size limit' }, { status: 413 });
    }

    const blob = await put(`products/${safeFilename}`, imageData, {
      access: 'public',
      contentType,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
