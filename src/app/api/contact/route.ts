import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    console.log('Outbound transmission received:', { name, email, subject, message });

    // Simulate success
    return NextResponse.json({
      success: true,
      message: 'TRANSMISSION RECEIVED // CORE PATH SECURE',
    });
  } catch (error) {
    console.error('Contact transmission error:', error);
    return NextResponse.json(
      { error: 'Failed to process transmission.' },
      { status: 500 }
    );
  }
}
