import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { checkAuth } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const session = await checkAuth();
    if (session instanceof NextResponse) return session;

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    const result = await uploadImage(base64Image);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
