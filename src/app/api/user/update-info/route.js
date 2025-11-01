import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { userId, fullName, whatsappNumber, email } = await request.json();

    // Validate required userId
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate WhatsApp number length if provided
    if (whatsappNumber && (whatsappNumber.length < 9 || whatsappNumber.length > 13)) {
      return NextResponse.json(
        { error: 'WhatsApp number must be between 9 and 13 characters' },
        { status: 400 }
      );
    }

    // Update the cookie_user record
    const { data, error } = await supabase
      .from('cookie_user')
      .update({
        full_name: fullName || null,
        whatsapp_number: whatsappNumber || null,
        email: email || null,
        last_active: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating cookie_user:', error);
      return NextResponse.json(
        { error: 'Failed to update user information' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in update-info API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
